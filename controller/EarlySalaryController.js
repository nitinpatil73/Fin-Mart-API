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
		     	// var ExpressLoan = require('./ExpressLoan');
		     	SaveExpressKotakLoanParameter(req.body.FirstName + " " + req.body.LastName,
		     		req.body.phoneNumber,
		     		req.body.City,
		     		req.body.LoanAmount,
		     		req.body.BankId,
		     		req.body.LoanType,
		     		req.body.FBAID,
		     		req.body.ApplicationID,
		     		req, res, function(data){
		     	 	console.log(data);
		     	 });
		        base.send_response("success",response,res);    
		     }
		     else{
		        base.send_response("Failed to fetch", null,res);
		     }
		  },6);
	};


	var KotakPersonalLoan = function (req, res, next) {
		 var PersonalLoan ={
				"IsExstCust": req.body.PersonalLoan.IsExstCust,
			    "ExstCustType": req.body.PersonalLoan.ExstCustType,
			    "CRN": req.body.PersonalLoan.CRN,
			    "PartyID": req.body.PersonalLoan.PartyID,
			    "FirstName": req.body.PersonalLoan.FirstName,
			    "MiddleName": req.body.PersonalLoan.MiddleName,
			    "LastName": req.body.PersonalLoan.LastName,
			    "Gender": req.body.PersonalLoan.Gender,
			    "Qualification": req.body.PersonalLoan.Qualification,
			    "DOB": req.body.PersonalLoan.DOB,
			    "Mobile": req.body.PersonalLoan.Mobile,
			    "Email": req.body.PersonalLoan.Email,
			    "Aadhar": req.body.PersonalLoan.Aadhar,
			    "PAN": req.body.PersonalLoan.PAN,
			    "EmpType": req.body.PersonalLoan.EmpType,
			    "Company_Cat": req.body.PersonalLoan.Company_Cat,
			    "Organization": req.body.PersonalLoan.Organization,
			    "CurCmpnyJoinDt": req.body.PersonalLoan.CurCmpnyJoinDt,
			    "TotWrkExp": req.body.PersonalLoan.TotWrkExp,
			    "OffAddress1": req.body.PersonalLoan.OffAddress1,
			    "OffAddress2": req.body.PersonalLoan.OffAddress2,
			    "OffAddress3": req.body.PersonalLoan.OffAddress3,
			    "OffCity": req.body.PersonalLoan.OffCity,
			    "OffPin": req.body.PersonalLoan.OffPin,
			    "OffPhone": req.body.PersonalLoan.OffPhone,
			    "PrefMailAdd": req.body.PersonalLoan.PrefMailAdd,
			    "ResAddress1": req.body.PersonalLoan.ResAddress1,
			    "ResAddress2": req.body.PersonalLoan.ResAddress2,
			    "ResAddress3": req.body.PersonalLoan.ResAddress3,
			    "ResCity": req.body.PersonalLoan.ResCity,
			    "ResPin": req.body.PersonalLoan.ResPin,
			    "ResType": req.body.PersonalLoan.ResType,
			    "CurResSince": req.body.PersonalLoan.CurResSince,
			    "ResPhNo": req.body.PersonalLoan.ResPhNo,
			    "same": req.body.PersonalLoan.same,
			    "PerAddress1": req.body.PersonalLoan.PerAddress1,
			    "PerAddress2": req.body.PersonalLoan.PerAddress2,
			    "PerAddress3": req.body.PersonalLoan.PerAddress3,
			    "PerCity": req.body.PersonalLoan.PerCity,
			    "PerPin": req.body.PersonalLoan.PerPin,
			    "PerResPhNo": req.body.PersonalLoan.PerResPhNo,
			    "NMI": req.body.PersonalLoan.NMI,
			    "EmiCurPay": req.body.PersonalLoan.EmiCurPay,
			    "LnAmt": req.body.PersonalLoan.LnAmt,
			    "TnrMths": req.body.PersonalLoan.TnrMths,
			    "IRR": req.body.PersonalLoan.IRR,
			    "ProcFee": req.body.PersonalLoan.ProcFee,
			    "IsCoApp": req.body.PersonalLoan.IsCoApp,
			    "CoAppReltn": req.body.PersonalLoan.CoAppReltn,
			    "CoAppDOB": req.body.PersonalLoan.CoAppDOB,
			    "CoAppEmpType": req.body.PersonalLoan.CoAppEmpType,
			    "CoAppOrg": req.body.PersonalLoan.CoAppOrg,
			    "CoAppNMI": req.body.PersonalLoan.CoAppNMI,
			    "CoAppEmiCurPay": req.body.PersonalLoan.CoAppEmiCurPay,
			    "Version": req.body.PersonalLoan.Version,
			    "brokerid": req.body.PersonalLoan.brokerid,
			    "empid": req.body.PersonalLoan.empid,
			    "source": req.body.PersonalLoan.source,
			    "CampaignName": req.body.PersonalLoan.CampaignName
		 };

		wrapper('/BankAPIService.svc/createKotakPersonalLoanReq', 'POST', {
			 	"PersonalLoan":PersonalLoan
		  }, function(kotakresponse) {
		  	console.log("----------------------------");
		  	console.log(kotakresponse);
		     if(kotakresponse != null){
		 	  js=JSON.parse(kotakresponse);
		 	  // var kotakparameter = [];
		 	  // kotakparameter.push(js.Response.ReferenceCode);

		 	//  var KotakLoan = require('./ExpressLoan');
		     	SaveExpressKotakLoanParameter(req.body.PersonalLoan.FirstName + " " + req.body.PersonalLoan.LastName,
		     	 	req.body.PersonalLoan.Mobile,
		     	 	req.body.PersonalLoan.OffCity,
		     	 	req.body.PersonalLoan.LnAmt,
		     	 	req.body.PersonalLoan.BankId,
		     	 	req.body.PersonalLoan.LoanType,
		     	 	req.body.PersonalLoan.FBAID,
		     	 	js.Response.ReferenceCode,
		     	 	req, res, function(data){
		     	 	console.log(data);
		     	 });
		        base.send_response("success",js,res);    
		     }
		     else{
		        base.send_response("Failed to fetch", null,res);
		     }
		  },6);
		};


	var SaveExpressKotakLoanParameter = function(name,mobile,city,loanamount,bankid,loantype,fbaid,applicationid,req, res, next) {
	var   SaveLoanParameter = [];
		  SaveLoanParameter.push(name);
		  SaveLoanParameter.push(mobile);
		  SaveLoanParameter.push(city);
		  SaveLoanParameter.push(loanamount);
		  SaveLoanParameter.push(bankid);
		  SaveLoanParameter.push(loantype);
		  SaveLoanParameter.push(fbaid);
		  SaveLoanParameter.push(applicationid);
    	  con.execute_proc('call SaveExpressLoanRequest(?,?,?,?,?,?,?,?)',SaveLoanParameter,function(savedata) {
      	  next(savedata);
    });
}
module.exports = {"EarlySalary":EarlySalary,"KotakPersonalLoan":KotakPersonalLoan,"SaveExpressKotakLoanParameter":SaveExpressKotakLoanParameter};