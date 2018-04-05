var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var ExpressLoanParameter = function(req, res, next) {
 con.execute_proc('call Express_Loan()',null,function(data) {
 var applicationquote = [];
 var ShortTermPersonalLoan = [];
  if(data != null){
  	var responsedata = {"PersonalLoan":data[0],"ShortTermPersonalLoan":data[1]};
    base.send_response("Success",responsedata,res);
  }
  else{
      base.send_response("Failure", "",res);        
  }
});

}


var SaveExpressLoanParameter = function(index,req, res,kotakparameter, next) {
	var SaveLoanParameter = [];
if(index == 1){
  SaveLoanParameter.push(req.body.PersonalLoan.FirstName + " " + req.body.PersonalLoan.LastName);
  SaveLoanParameter.push(req.body.PersonalLoan.Mobile);
  SaveLoanParameter.push(req.body.PersonalLoan.OffCity);
  SaveLoanParameter.push(req.body.PersonalLoan.LnAmt);
  SaveLoanParameter.push(req.body.PersonalLoan.BankId);
  SaveLoanParameter.push(req.body.PersonalLoan.LoanType);
  SaveLoanParameter.push(req.body.PersonalLoan.FBAID);
  SaveLoanParameter.push(kotakparameter);
}
  else if(index ==2 ){
	SaveLoanParameter.push(req.body.FirstName + " " + req.body.LastName);
	SaveLoanParameter.push(req.body.phoneNumber);
	SaveLoanParameter.push(req.body.City);
	SaveLoanParameter.push(req.body.LoanAmount);
	SaveLoanParameter.push(req.body.BankId);
	SaveLoanParameter.push(req.body.LoanType);
	SaveLoanParameter.push(req.body.FBAID);
	SaveLoanParameter.push(req.body.ApplicationID);
}
	con.execute_proc('call SaveExpressLoanRequest(?,?,?,?,?,?,?,?)',SaveLoanParameter,function(savedata) {
    next(savedata);
});

}

var GetExpressLoanParameter = function(req, res, next) {
	var GetLoanParameter = [];
	GetLoanParameter.push(req.body.FBAID);
	con.execute_proc('call GetExpressLoanRequest(?)',GetLoanParameter,function(getdata) {
  	if(getdata != 0 && getdata[0].length>0){
    	base.send_response("Success",getdata[0],res);
  	}
  	else{
      base.send_response("Failure",null,res);        
  	}
});

}

module.exports = {"ExpressLoanParameter" :ExpressLoanParameter,"SaveExpressLoanParameter":SaveExpressLoanParameter,"GetExpressLoanParameter":GetExpressLoanParameter};