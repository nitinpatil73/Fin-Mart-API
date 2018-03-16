var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var app = require('./wrapper.js');

var MPSControllerParameter = function (req, res, next, pospno) {
   var fba_req_id = [];
   fba_req_id.push(req.body.FBAID);
  con.execute_proc('call get_user_details_for_mps(?)',fba_req_id,function(response) {
    if(response!=null){
           app('/api/PaymentGateway/PaymentDataRequest', 'POST', {
            "Amount": 1150,
            "ProdID": 512,
            "MRP": 500,
            "Discount": 0,
            "ServTaxAmt": 90,
            "VATAmt": 0,
            "TotalAmt": 1150,
            "BalanceAmt": 0,
            "DatacompCustomerID" : response[0][0].CustID,
            "CustomerMobileNumber" : response[0][0].MobiNumb1,
            "PartID": 4044841,
            "CustomerEmailID" : response[0][0].EmailID,
            "CustomerName" : response[0][0].FullName,
            "OrderDesp": "Platform for onboarding for Fin-Mart",
            "AccNotes": "Platform for onboarding for Fin-Mart",
            "SuccResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTSuccess.aspx",
            "FailResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTFailed.aspx",
            "CancResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTCancelled.aspx",
            "ufv1": "6",
            "ufv2": "",
            "ufv3": "",
            "ufv4": "",
            "ufv5": "",
            "BranCode": "",
            "ProdDesc": "Platform for onboarding for Fin-Mart",
            "ProdUSERID": null,
            "ProdPASSWORD": null,
            "DebitCredit": 0,
            "PromCode": null,
            "DWTInvo": null,
            "AppID": "171",
            "AppUSERID": "3OK92Dl/LwA0HqfC5+fCxw==",
          "AppPASSWORD": "BjLfd1dqTCyH1DQLhylKRQ=="
            }, function(data) {
        console.log("---PaymentDataRequest----");
        console.log(data);
              if(data.type == "Success"){
                console.log(message);
                var message = JSON.parse(data.message);
                console.log("-------------------------------");
                console.log(message);
                if(message.Status == "1"){
                  var parameter = [];
                  parameter.push(req.body.FBAID);
                  parameter.push(message.PaymentURL);
                  parameter.push(message.PaymRefeID);
                  parameter.push(response[0][0].CustID);
                  parameter.push(512);
                  console.log(parameter);
                  con.execute_proc('call sp_InsPaymentlink(?,?,?,?,?)',parameter,function(respdata) {
                    console.log(respdata);
                  if(respdata[0][0].SavedStatus == 0){
                    message.POSPNo = pospno;
                    base.send_response("Success", message,res);
                  }
                  else{
                    base.send_response(respdata[0][0].Message, null,res);       
                  } 
                });
                  //base.send_response("Success", message,res);
                }
                else{
                  base.send_response("Invalid response in PaymentDataRequest", null,res);
                }
              }
              else{
                base.send_response("Invalid response in `", null,res);
              }
              
            },5);
    }else{
         base.send_response("failure",null,res);
    }

  });
};

module.exports = {
"MPSControllerParameter":MPSControllerParameter,
};