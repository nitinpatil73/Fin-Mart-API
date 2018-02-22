var con=require('../bin/dbconnection.js');
var base = require('./baseController');


var FBAUpdateAccount = function(req, res, next) {

var FBAUpdateAccountparameter = [];
if(req.body.Type == 1){//1st panel
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.FBA_Designation);
	FBAUpdateAccountparameter.push(req.body.Mobile_1 );
	FBAUpdateAccountparameter.push(req.body.EmailId );
	con.execute_proc('call UpdateAccountProfile(?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);

	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Success", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});
}
else if(req.body.Type == 2){//2nd panel
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.Address_1);
	FBAUpdateAccountparameter.push(req.body.Address_2);
	FBAUpdateAccountparameter.push(req.body.Address_3);
	FBAUpdateAccountparameter.push(req.body.PinCode);
	FBAUpdateAccountparameter.push(req.body.City);
	FBAUpdateAccountparameter.push(req.body.State);

	con.execute_proc('call UpdateAccountAddress(?,?,?,?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Success", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
	});
}else if(req.body.Type == 3){//3rd panel
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.Loan_FirstName);
	FBAUpdateAccountparameter.push(req.body.Loan_PAN );
	FBAUpdateAccountparameter.push(req.body.Loan_Aadhaar );
	FBAUpdateAccountparameter.push(req.body.Loan_BankAcNo);
	FBAUpdateAccountparameter.push(req.body.Loan_Account_Type);
	FBAUpdateAccountparameter.push(req.body.Loan_BankName);
	FBAUpdateAccountparameter.push(req.body.Loan_BankBranch);
	FBAUpdateAccountparameter.push(req.body.Loan_IFSC);
	FBAUpdateAccountparameter.push(req.body.Loan_MICR);
	FBAUpdateAccountparameter.push(req.body.Loan_Bank_City);
	con.execute_proc('call UpdateAccountBankDetails(?,?,?,?,?,?,?,?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Success", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});
}
else if(req.body.Type == 4){
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.display_email);
	FBAUpdateAccountparameter.push(req.body.display_phone_no);
	FBAUpdateAccountparameter.push(req.body.dispaly_designation);

	con.execute_proc('call UpdateAccountFBARDisplay(?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Success", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});
}
}

var GetMyAccount = function(req, res, next){
		var GetMyAccount = [];
		GetMyAccount.push(req.body.FBAID);	//
		console.log(GetMyAccount);
		con.execute_proc('call GetMyAccount(?)',GetMyAccount,function(data) {
		console.log(data);
		base.send_response("Success", data[0],res);
		
   	});
}
//console.log(FBAUpdateAccountparameter);
module.exports = {"FBAUpdateAccount":FBAUpdateAccount,"GetMyAccount":GetMyAccount};
