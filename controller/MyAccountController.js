var con=require('../bin/dbconnection.js');
var base = require('./baseController');


var FBAUpdateAccount = function(req, res, next) {

var FBAUpdateAccountparameter = [];

if(req.body.Type == 0){
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.FBA_Designation);
	FBAUpdateAccountparameter.push(req.body.Mobile_1 );
	FBAUpdateAccountparameter.push(req.body.EmailId );
	FBAUpdateAccountparameter.push(req.body.Address_1);
	FBAUpdateAccountparameter.push(req.body.Address_2);
	FBAUpdateAccountparameter.push(req.body.Address_3);
	FBAUpdateAccountparameter.push(req.body.PinCode);
	FBAUpdateAccountparameter.push(req.body.City);
	FBAUpdateAccountparameter.push(req.body.State);
	FBAUpdateAccountparameter.push(req.body.Loan_FirstName);
	FBAUpdateAccountparameter.push(req.body.Loan_PAN );
	FBAUpdateAccountparameter.push(req.body.Loan_Aadhaar );
	FBAUpdateAccountparameter.push(req.body.Loan_BankAcNo);
	FBAUpdateAccountparameter.push(req.body.Loan_Account_Type);
	FBAUpdateAccountparameter.push(req.body.Loan_BankName);
	FBAUpdateAccountparameter.push(req.body.Loan_BankBranch);
	FBAUpdateAccountparameter.push(req.body.Loan_IFSC);
	FBAUpdateAccountparameter.push(req.body.Loan_MICR);
	FBAUpdateAccountparameter.push(req.body.Loan_BankCity);
	FBAUpdateAccountparameter.push(req.body.DisplayEmail);
	FBAUpdateAccountparameter.push(req.body.DisplayPhoneNo);
	FBAUpdateAccountparameter.push(req.body.DisplayDesignation);
	con.execute_proc('call AllUpdateMyAccount(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);

	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Profile updated successfully", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});
}
else if(req.body.Type == 1){//1st panel
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.FBA_Designation);
	FBAUpdateAccountparameter.push(req.body.Mobile_1 );
	FBAUpdateAccountparameter.push(req.body.EmailId );
	con.execute_proc('call UpdateAccountProfile(?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);

	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Profile updated successfully", data[0][0],res);
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
		base.send_response("Profile updated successfully", data[0][0],res);
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
		base.send_response("Profile updated successfully", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});
}
else if(req.body.Type == 4){
	FBAUpdateAccountparameter.push(req.body.FBAID);
	FBAUpdateAccountparameter.push(req.body.DisplayEmail);
	FBAUpdateAccountparameter.push(req.body.DisplayPhoneNo);
	FBAUpdateAccountparameter.push(req.body.DisplayDesignation);

	con.execute_proc('call UpdateAccountFBARDisplay(?,?,?,?)',FBAUpdateAccountparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Profile updated successfully", data[0][0],res);
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
		if(data!=null && data[0].length>0){
			 var doc_available = data[1];		
			 var response = data[0];
			for (var i = 0 ; i < data[1].length; i++) {
				
				if(data[1][i].FileName!=null &&data[1][i].FileName!=""){					
					data[1][i].FileName = "http://" + req.headers.host + "/upload/"+ data[1][i].FileName;
				}				
			} 
			 response[0].doc_available = doc_available;
			// for (var i = 0 ; i < data[0].length; i++) {
			// 	data[0][i].doc_available = req.headers.host + "/upload/"+ data[0][i].doc_available;
			// }
			base.send_response("Profile updated successfully",response,res);
		}
		else{
			base.send_response("Failed to fetch", null,res);
		}
		
   	});
}
//console.log(FBAUpdateAccountparameter);
module.exports = {"FBAUpdateAccount":FBAUpdateAccount,"GetMyAccount":GetMyAccount};
