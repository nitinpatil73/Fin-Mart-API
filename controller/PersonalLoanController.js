var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var handler = require('./HandlerController');

var managePersonalLoan = function(req, res, next) {

var parameter = [];
if(req.body.loan_requestID){
	parameter.push(req.body.loan_requestID);
}
else{
	parameter.push(null);
}
parameter.push(req.body.FBA_id);
parameter.push(req.body.PersonalLoanRequest.quote_id);
parameter.push(req.body.PersonalLoanRequest.ApplicantDOB);
parameter.push(req.body.PersonalLoanRequest.ApplicantGender);
parameter.push(req.body.PersonalLoanRequest.ApplicantIncome);
parameter.push(req.body.PersonalLoanRequest.ApplicantNme);
parameter.push(req.body.PersonalLoanRequest.ApplicantObligations);
parameter.push(req.body.PersonalLoanRequest.ApplicantSource);
parameter.push(req.body.PersonalLoanRequest.BrokerId);
parameter.push(req.body.PersonalLoanRequest.LoanRequired);
parameter.push(req.body.PersonalLoanRequest.LoanTenure);
parameter.push(req.body.PersonalLoanRequest.api_source);
parameter.push(req.body.PersonalLoanRequest.empcode);
parameter.push(req.body.PersonalLoanRequest.Contact);
parameter.push(req.body.PersonalLoanRequest.panno);
console.log(parameter);
con.execute_proc('call ManagePersonalLoan(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',parameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		base.send_response("Success", data[0],res);
	}
	else{
			base.send_response("Failure", "",res);				
	}
});

};

var getPersonalLoan = function(req, res, next) {
var parameter = [];
parameter.push(req.body.FBA_id);	
con.execute_proc('call getPersonalLoanRequest(?)',parameter,function(data) {


		
		var quoteresponse = [];
		var applicationquote = [];

		for (var i = 0; i < data[0].length; i++) {
			data[0][i].progress_image = null;
			var response ={				
				"loan_requestID" : data[0][i].loan_requestID,
				"FBA_id" : data[0][i].FBA_id,
				"PersonalLoanRequest" : data[0][i]
			};
			quoteresponse.push(response);
		}


		for (var i = 0; i < data[1].length; i++) {
			data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
			var response ={
				
				"loan_requestID" : data[1][i].loan_requestID,
				"FBA_id" : data[1][i].FBA_id,
				"PersonalLoanRequest" : data[1][i]
			};
			applicationquote.push(response);
		}
		var responsedata = {"quote":quoteresponse,"application":applicationquote};
		base.send_response("Success", responsedata,res);
	});
};

var quoteApplicationPersonalLoan = function(req, res, next) {

var parameter = [];
if(req.body.loan_requestID){
	parameter.push(req.body.loan_requestID);
}
else{
	parameter.push(null);
}
console.log(parameter);
con.execute_proc('call setQuoteToApplicationLoanRequest(?)',parameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		base.send_response("Success", data[0],res);
	}
	else{
			base.send_response("Failure", "",res);				
	}
});

};

var deletePersonalLoan = function(req, res, next) {

var parameter = [];
if(req.body.loan_requestID){
	parameter.push(req.body.loan_requestID);
}
else{
	parameter.push(null);
}
console.log(parameter);
con.execute_proc('call deletePersonalLoanRequest(?)',parameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		base.send_response("Success", data[0],res);
	}
	else{
			base.send_response("Failure", "",res);				
	}
});

};

module.exports = {"managePersonalLoan" : managePersonalLoan,"getPersonalLoan" : getPersonalLoan,"quoteApplicationPersonalLoan":quoteApplicationPersonalLoan,"deletePersonalLoan":deletePersonalLoan};