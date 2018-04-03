var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var EarlySalary = function (req, res, next) {
		wrapper('/BankAPIService.svc/createEarlySalaryReq', 'POST', {
		    "FirstName" : req.body.FirstName,
		    "LastName" : req.body.LastName,
		    "phoneNumber" : req.body.phoneNumber,
		    "Age" : req.body.Age,
		    "email" : req.body.email,
		    "City" : req.body.City,
		    "RefferalCode" : req.body.RefferalCode,
		    "Employment" : req.body.Employment,
		    "MonthlySalary" : req.body.MonthlySalary,
		    "LoanAmount" : req.body.LoanAmount,
		    "empid":req.body.empid,
		    "brokerid":req.body.brokerid,
		    "source":req.body.source,
		    "CampaignName":req.body.CampaignName
		  }, function(response) {
		     if(response != null){
		     	 var ExpressLoan = require('./ExpressLoan');
		     	 ExpressLoan.SaveExpressLoanParameter(req, res, next);
		        base.send_response("success",response,res);    
		     }
		     else{
		        base.send_response("Failed to fetch", null,res);
		     }
		  },6);
	};
module.exports = {"EarlySalary":EarlySalary};