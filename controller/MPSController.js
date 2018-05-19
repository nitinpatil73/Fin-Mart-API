var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var app = require('./wrapper.js');

var MPSControllerParameter = function (req, res, next, pospno) {
   var fba_req_id = [];
   fba_req_id.push(req.body.FBAID);
  con.execute_proc('call get_user_details_for_mps(?)',fba_req_id,function(response) {
    console.log(response);
    if(response!=null && response[0].length>0){
      if(response[0][0].Link){
       //if(false){
        var resdata={
           "PaymentURL": response[0][0].Link,
            "Amount": 1150,
            "ProdID": 512,
            "MRP": 500,
            "Discount": 0,
            "ServTaxAmt": 90,
            "VATAmt": 0,
            "TotalAmt": 1150,
            "BalanceAmt": 0
        };
            base.send_response("success",resdata,res);
      }else{
          if(response[0][0].CustID=='0'){
             base.send_response("Customer ID not found.",null,res);
          }else{
            app('/api/CommonAPI/GetProdPriceDeta', 'POST', {
                  "ProdID":"513",
                  "CustID":response[0][0].CustID,
                  "PartID":"4444444",
                  "UserID":"0",
                  "IsScheme":"0",
                  "FBAId":0,
                  "ResponseJson":null,
                  "AppID":"171",
                  "AppUSERID":"3OK92Dl/LwA0HqfC5+fCxw==",
                  "AppPASSWORD":"BjLfd1dqTCyH1DQLhylKRQ=="
              }, function(propridata) {
                var messageproductprice =JSON.parse(propridata.message);
               if(messageproductprice.Status=="1"){
             app('/api/PaymentGateway/PaymentDataRequest', 'POST', {
            "Amount": messageproductprice.TotalAmt,
            "ProdID": messageproductprice.ProdID,
            "MRP": messageproductprice.MRP,                    //500,
            "Discount": 0,
            "ServTaxAmt": messageproductprice.GSTAmt,           //90,
            "VATAmt": messageproductprice.GSTVal,                //0,
            "TotalAmt": messageproductprice.TotalAmt,             //1150,
            "BalanceAmt": 0,
            "DatacompCustomerID" : response[0][0].CustID,
            "CustomerMobileNumber" : response[0][0].MobiNumb1,
            "PartID": 4044841,
            "CustomerEmailID" : response[0][0].EmailID,
            "CustomerName" : response[0][0].FullName,
            "OrderDesp": "Magic platinum subcription",
            "AccNotes": "Magic platinum subcription",
            "SuccResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTSuccess.aspx",
            "FailResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTFailed.aspx",
            "CancResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTCancelled.aspx",
            "ufv1": "6",
            "ufv2": "",
            "ufv3": "",
            "ufv4": "",
            "ufv5": "",
            "BranCode": "",
            "ProdDesc": "Magic platinum subcription",
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
                    //message.Amount = 1150,
                    message.Amount = messageproductprice.TotalAmt,
                    //message.ProdID = 512,
                    message.ProdID = messageproductprice.ProdID,
                    //message.MRP = 500,
                    message.MRP = messageproductprice.MRP,
                    message.Discount = 0,
                    //message.ServTaxAmt = 90,
                    message.ServTaxAmt = messageproductprice.GSTAmt,
                    // message.VATAmt = 0,
                    message.VATAmt = messageproductprice.GSTVal,
                    //message.TotalAmt = 1150,
                    message.TotalAmt=messageproductprice.TotalAmt
                    message.BalanceAmt = 0,
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
                base.send_response("Invalid response", null,res);
              }
              
            },5);
            }
            else{
              base.send_response("Invalid response in GetProdPriceDeta", null,res);
            }
            },5);
          }
    }
  }else{
         base.send_response("Payment link not available",null,res);
    }

  });
};

module.exports = {
"MPSControllerParameter":MPSControllerParameter,
};