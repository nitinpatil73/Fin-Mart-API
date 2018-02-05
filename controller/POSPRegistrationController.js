var con=require('../bin/dbconnection.js');
var base=require('./baseController');


var pospregistration = function(req, res, next) {


SaveFBADetaPolicyBoss(req,res,'Mumbai',next);

/*	con.execute_proc('call sp_Ins_UpPOSPInfo(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',POSPRegistration(req),function(respdata) {
		if(respdata[0][0].SavedStatus == 0){
			base.send_response(respdata[0][0].Message, respdata[0][0] ,res);
		}
		else{
				base.send_response(respdata[0][0].Message, null,res);				
		}	
	});*/
};


function SaveFBADetaPolicyBoss(req,res,PospAdd_City,next){

	var basicDetails = {
		FirstName : req.body.FirstName,
	    LastName : req.body.LastName,
	    DateOfBirth : req.body.DOB,
	    Gender : req.body.Gender,
	    Mobile1 : req.body.Mobile_1,
	    Mobile2 : req.body.Mobile_2,
	    Email : req.body.EmailId,
	    PAN : "",
	    ServiceTaxNumber : req.body.Posp_ServiceTaxNo
	};


	var address = {
		Address1 : req.body.Address_1,
		Address2 : req.body.Address_2,
		Address3 : req.body.Address_3,
		Pincode : req.body.PinCode,
	    CityID : PospAdd_City
	};


	var presentation = {
		FirstName : req.body.Posp_FirstName,
		LastName : req.body.Posp_LastName,
		PAN : req.body.Posp_PAN,
		Aadhar : req.body.Posp_Aadhaar,
		BankAccountNumber : req.body.Posp_BankAcNo,
		AccountType : req.body.Posp_Account_Type,
		IFSCCode : req.body.Posp_IFSC,
		MICRCode : req.body.Posp_MICR,
		BankName : req.body.Posp_BankName,
		BankBranch : req.body.Posp_BankBranch,
		BankCity : req.body.Posp_BankCity

	};

	var nominee ={
		FirstName : req.body.Other_FirstName,
		LastName : req.body.Other_LastName,
		PAN : req.body.Other_PAN,
		BankAccountNumber : req.body.Other_BankAcNo,
		AccountType : req.body.Other_Account_Type,
		IFSCCode : req.body.Other_IFSC,
		MICRCode : req.body.Other_MICR,
		BankName : req.body.Other_BankName,
		BankBranch : req.body.Other_BankBranch,
		BankCity : req.body.Other_BankCity
	};

	var fbaRegePolicyBossInfo = {
		FBAID : req.body.FBAID,
		SM_POSP_ID : req.body.SMID,
		SM_POSP_Name : req.body.SM_Name,
		BasicDetails : basicDetails,
		Address : address,
		Presentation : presentation,
		Nominee : nominee

	};
	console.log(fbaRegePolicyBossInfo);
	res.send(req);
}

function POSPRegistration(req){
	var representation = [];
	if(req.body.FBAID){
		representation.push(req.body.FBAID);
	}
	else{
		representation.push(0);
	}
	representation.push(req.body.Posp_FirstName + req.body.Posp_LastName );//p_POSPPAN  varchar(10),
	representation.push(req.body.Posp_PAN );//p_POSPPAN  varchar(10),
	representation.push(req.body.Posp_Aadhaar);//p_POSPAadhaar  varchar(15),
	representation.push(req.body.Posp_BankAcNo);//p_POSPBankAccNo  varchar(20),
	representation.push(req.body.Posp_Account_Type);//p_POSPBankAccType  varchar(25),
	representation.push(req.body.Posp_BankName);//p_POSPBankName  varchar(50),
	representation.push(req.body.Posp_BankBranch);//p_POSPBankBran  varchar(50),
	representation.push(req.body.Posp_IFSC);//p_POSPBankIFSCCode  varchar(15),
	representation.push(req.body.Posp_MICR);//p_POSPBankMICRCode  varchar(10),
	// representation.push(req.body.Loan_FirstName + req.body.Loan_LastName );//p_LoanName  varchar(50),
	// representation.push(req.body.Loan_PAN);//p_LoanPAN  varchar(10),
	// representation.push(req.body.Loan_Aadhaar);//p_LoanAadhaar  varchar(15),
	// representation.push(req.body.Loan_BankAcNo);//p_LoanBankAccNo  varchar(20),
	// representation.push(req.body.Loan_Account_Type);//p_LoanBankAccType  varchar(50),
	// representation.push(req.body.Loan_BankName);//p_LoanBankName  varchar(50),
	// representation.push(req.body.Loan_BankBranch);//p_LoanBankBran  varchar(50),
	// representation.push(req.body.Loan_IFSC);//p_LoanBankIFSCCode  varchar(15),
	// representation.push(req.body.Loan_MICR);//p_LoanBankMICRCode  varchar(10),
	representation.push(req.body.Other_FirstName + req.body.Other_LastName);//p_OtherName  varchar(50),
	representation.push(req.body.Other_PAN);//p_OtherPAN  varchar(10),
	representation.push(req.body.Other_Aadhaar);//p_OtherAadhaar  varchar(15),
	representation.push(req.body.Other_BankAcNo);//p_OtherBankAccNo  varchar(20),
	representation.push(req.body.Other_Account_Type);//p_OtherBankAccType  varchar(50),
	representation.push(req.body.Other_BankName);//p_OtherBankName  varchar(50),
	representation.push(req.body.Other_BankBranch);//p_OtherBankBranch  varchar(50),
	representation.push(req.body.Other_IFSC);//p_OtherBankIFSCCode  varchar(15),
	representation.push(req.body.Other_MICR);//p_OtherBankMICRCode  varchar(10),
	
	representation.push(req.body.Posp_ServiceTaxNo);//p_ServTaxNo varchar(50),
	representation.push(req.body.Posp_DOB);//p_POSPDOB DATETIME,
	representation.push(req.body.Posp_Gender);//p_POSPGender CHAR(1),
	representation.push(req.body.Posp_Mobile1);//p_POSPMobile1 VARCHAR(12),
	representation.push(req.body.Posp_Mobile2);//p_POSPMobile2 VARCHAR(12),
	representation.push(req.body.Posp_Email);//p_POSPEmail VARCHAR(50),
	representation.push(req.body.Posp_Address1);//p_POSPAddress1 VARCHAR(75),
	representation.push(req.body.Posp_Address2);//p_POSPAddress2 VARCHAR(75),
	representation.push(req.body.Posp_Address3);//p_POSPAddress3 VARCHAR(75),
	representation.push(req.body.Posp_PinCode);//p_POSPPinCode VARCHAR(6),
	representation.push(req.body.Posp_City);//p_POSPCity VARCHAR(25),
	representation.push(req.body.Posp_StatID);//p_POSPStatID SMALLINT,
	representation.push(req.body.Posp_ChanPartCode);//p_POSPChanPartCode VARCHAR(20)
	return representation;
	// var representation =  InsertUpdateFBARepresentation(data[0][0].FBAID,req,res,next);
	
}

module.exports = pospregistration;