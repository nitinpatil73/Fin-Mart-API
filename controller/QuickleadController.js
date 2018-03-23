var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var QuickLead = function (req, res, next) {
wrapper('/BankAPIService.svc/createOtherLoanLeadReq', 'POST', {
   "brokerId": req.body.brokerId,
  "Source": "DC",
  "Name": req.body.Name,
  "EMail": req.body.EMail,
  "Mobile": req.body.Mobile,
  "Status": "43",
  "ProductId":req.body.ProductId,
  "Loan_amt": req.body.Loan_amt,
  "FBA_Id": req.body.FBA_Id,
  "Monthly_income": req.body.Monthly_income,
  "Remark": req.body.Remark,
  "followupDate": req.body.followupDate,
  "empCode": "Rb40000432"
  }, function(data) {
   console.log(data);
    if(data!=null){
      var respose = JSON.parse(data);
      console.log(respose);
      if(respose.Status=="1"){

         var parameter = [];
          parameter.push(req.body.brokerId);
          parameter.push(req.body.Name);
          parameter.push(req.body.EMail);
          parameter.push(req.body.Mobile);
          parameter.push("43");
          parameter.push(req.body.ProductId);
          parameter.push(req.body.Loan_amt);
          parameter.push(req.body.FBA_Id);
          parameter.push(req.body.Monthly_income);
          parameter.push(req.body.Remark);
          parameter.push(req.body.followupDate);
          parameter.push("Rb40000432");
          parameter.push(respose.Lead_Id);
          // console.log("**********************************************************");
          // console.log(parameter);
          con.execute_proc('call insert_quick_lead(?,?,?,?,?,?,?,?,?,?,?,?,?)',parameter,function(respdata) {
          // console.log("**********************************************************");
          // console.log(respdata);
            if(respdata[0][0].SavedStatus == 0){
              base.send_response("Success", respose,res);
            }else{
              base.send_response(respdata[0][0].respose, null,res);       
            } 
          });
       // base.send_response("Success",respose,res);
      }
      else{
        base.send_response(respose.Errorinfo,null,res);
      }    
    }
    else{
        base.send_response("failure",data, res);
    }
  },6);
};


// var DeleteOtherLoanLeadReqParameter = function (req, res, next) {
//     wrapper('/BankAPIService.svc/DeleteOtherLoanLeadReq', 'POST', {
//       "Lead_Id":req.body.Lead_Id,
//     }, function(data) {
//     if(data!=null){
//       var delrespose = JSON.parse(data);
//       if(delrespose.Status=='1')
//       {
//           var delparameter = [];
//           delparameter.push(req.body.Lead_Id);
//            con.execute_proc('call Update_quick_lead_request(?)',delparameter,function(delrespdata) {
//             if(delrespdata[0][0].SavedStatus == 0){
//               base.send_response("Success", delrespdata,res);
//             }else{
//               base.send_response(delrespdata[0][0].Status, null,res);       
//             } 
//           });
//       }
//       else
//       {
//          base.send_response("Failure", null,res); 
//       }
//       base.send_response("Success",delrespose,res); 
//     }
//     else{
//       base.send_response("Failure", null,res);    
//     } 
//   },6);
// };
module.exports = {"QuickLead":QuickLead};