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
        base.send_response("Success",respose,res);
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
module.exports = {
"QuickLead":QuickLead,
};