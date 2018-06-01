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


var quikleadfromrupeeboss = function (req, res, next) {
          var parameter = [];        
                
          parameter.push(req.body.Broker_Id);
          parameter.push(req.body.Email);
          parameter.push(req.body.FBA_Id);
          parameter.push(req.body.FollowUp_Date);
          parameter.push(req.body.Lead_Date);
          parameter.push(req.body.Lead_Status_Id);
          parameter.push(req.body.Lead_id);
          parameter.push(req.body.Loan_Amt);
          parameter.push(req.body.Mobile);
          parameter.push(req.body.MonthlyIncome);
          parameter.push(req.body.Name);
          parameter.push(req.body.Product_Id);
          parameter.push(req.body.Remark);       
          console.log("**********************************************************");
          console.log(parameter);
          con.execute_proc('call quickleadrequest_data(?,?,?,?,?,?,?,?,?,?,?,?,?)',parameter,function(respdata) {
          // console.log("**********************************************************");
          // console.log(respdata);
            if(respdata[0][0].SavedStatus == 0){
              base.send_response("Success", respdata,res);
            }else{
              base.send_response("Failed to save data", null,res);       
            } 
          });
};

// function formatDate(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var second = date.getSeconds();
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0'+minutes : minutes;
//   var strTime = hours + ':' + minutes +':'+ second;
//   return date.getFullYear()+1 + "-" + date.getMonth() + "-" + date.getDate() + "  " + strTime;
// }

module.exports = {"QuickLead":QuickLead,"quikleadfromrupeeboss":quikleadfromrupeeboss};