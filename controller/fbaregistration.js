// var express = require('express');
// var router = express.Router();
// var response_status = require('./responsestatus');
var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var RBLog  = require('../model/RBUpdateLoanLog.js');

var insertFBARegistration = function(req, res, next) {

// console.log(res.body);
var fbadata = [];
//console.log(req.body.FirstName);
fbadata.push(req.body.FirstName);//FirsName`,
fbadata.push(req.body.LastName);//`LastName`,
fbadata.push(req.body.Gender);//`Gender`,
fbadata.push(req.body.DOB);//`DOB`,
fbadata.push(req.body.Mobile_1);//`MobiNumb1`,
fbadata.push(req.body.Mobile_2);//`MobiNumb2`,
fbadata.push(req.body.EmailID);//`EmailID`,
fbadata.push(req.body.PinCode);//`PinCode`,
fbadata.push(req.body.City);//`City`,
fbadata.push(req.body.StateID);//`StatID`,
fbadata.push("R");//`FBAStat`,
fbadata.push(req.body.SMID);//`SMID`,
fbadata.push(req.body.CustID);//`CustID`,
console.log(fbadata);
//res.send(fbadata);

//InsertUpdateFBARepresentation(10,req,res,next);

con.execute_proc('call InsertFBARegistration(?,?,?,?,?,?,?,?,?,?,?,?,?)',fbadata,function(data) {
	if(data[0][0].SavedStatus == 0){
		//RupeeBossFBARegistartion(data[0][0].FBAID,req, res, next);
		InsertFBAUsers(data[0][0].FBAID,req, res, next);
		InsertUpdateFBARepresentation(data[0][0].FBAID,req, res, next);
		InsertUpdateFBAProfessionalAuto(data[0][0].FBAID,req, res, next);
		base.send_response(data[0][0].Message, data,res);
	}
	else{
			base.send_response(data[0][0].Message, null,res);				
	}
});

};




function RupeeBossFBARegistartion(FBAID,req, res, next) {
	req.body.FBAID = FBAID;
	req.body.fromrb = 1;
	
	console.log(req.body);
	wrapper('/LoginDtls.svc/xmlservice/insFbaRegistration', 'POST', 
    req.body
  , function(data) {
  	console.log("LoanId"+data.result);
  	if(data.statusId == 0){
  		UpdateLoanId(FBAID,data.result);
  	}
  	else{
		var loan = new RBLog({ FBAId: FBAID,RequestString:req.body,IsActive:true });
		loan.save(function(err) {
			if(err){
				console.lof(err);
			};
		});
  	}

  
  	// if(data!=null){
	  // 	base.send_response(data, res);
  	// }
  	// else{
  	// 	base.send_response(data, res);
  	// }
  },3);
}


function UpdateLoanId(FBAID,LoanId,req, res, next) {
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(LoanId); 
	con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
		console.log(loandata);
	});
	// console.log(personal);
}

function InsertFBAUsers(FBAID,req, res, next) {
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(req.body.EmailId); 
	fbausers.push(""); //p_LifeComp     VARCHAR(50),
	fbausers.push(req.body.password); //p_IsGeneInsu   TINYINT,
	fbausers.push(""); //p_GeneComp     VARCHAR(50),
	fbausers.push(""); //p_IsHealthInsu TINYINT,
	fbausers.push(0); //p_HealthComp   VARCHAR(50),
	fbausers.push("");
	//var fbasers = InsertFBAUsers(FBAID,req,res,next);
	con.execute_proc('call spInsertFBAUsers(?,?,?,?,?,?,?,?)',fbausers,function(fbauserdata) {
		console.log(fbauserdata);
	});
	// console.log(personal);
}

function InsertUpdateFBAProfessionalAuto(FBAID,req, res, next) {
	var personal = [];
	personal.push(FBAID); //p_FBAID        INT,
	personal.push(req.body.IsLic ); //p_IsLifeInsu   TINYINT,
	personal.push(req.body.LIC_Comp_ID ); //p_LifeComp     VARCHAR(50),
	personal.push(req.body.IsGic ); //p_IsGeneInsu   TINYINT,
	personal.push(req.body.GIC_Comp_ID ); //p_GeneComp     VARCHAR(50),
	personal.push(req.body.IsHealth ); //p_IsHealthInsu TINYINT,
	personal.push(req.body.Health_Comp_ID ); //p_HealthComp   VARCHAR(50),
	personal.push(req.body.MF ); //p_IsMutualFund TINYINT,
	personal.push(req.body.Stock ); //p_IsStocks     TINYINT,
	personal.push(req.body.Postal ); //p_IsPostSavi   TINYINT,
	personal.push(req.body.Bonds ); //p_IsBonds      TINYINT
	con.execute_proc('call InsertUpdateFBAProfessionalAuto(?,?,?,?,?,?,?,?,?,?,?)',personal,function(autodata) {
		console.log(autodata);
	});
}

function InsertUpdateFBARepresentation(FBAID,req, res, next){
var representation = [];
	  
	representation.push(req.body.Posp_FirstName + req.body.Posp_LastName );//p_POSPPAN  varchar(10),
	representation.push(req.body.Posp_PAN );//p_POSPPAN  varchar(10),
	representation.push(req.body.Posp_Aadhaar);//p_POSPAadhaar  varchar(15),
	representation.push(req.body.Posp_BankAcNo);//p_POSPBankAccNo  varchar(20),
	representation.push(req.body.Posp_Account_Type);//p_POSPBankAccType  varchar(25),
	representation.push(req.body.Posp_BankName);//p_POSPBankName  varchar(50),
	representation.push(req.body.Posp_BankBranch);//p_POSPBankBran  varchar(50),
	representation.push(req.body.Posp_IFSC);//p_POSPBankIFSCCode  varchar(15),
	representation.push(req.body.Posp_MICR);//p_POSPBankMICRCode  varchar(10),
	representation.push(req.body.Loan_FirstName + req.body.Loan_LastName );//p_LoanName  varchar(50),
	representation.push(req.body.Loan_PAN);//p_LoanPAN  varchar(10),
	representation.push(req.body.Loan_Aadhaar);//p_LoanAadhaar  varchar(15),
	representation.push(req.body.Loan_BankAcNo);//p_LoanBankAccNo  varchar(20),
	representation.push(req.body.Loan_Account_Type);//p_LoanBankAccType  varchar(50),
	representation.push(req.body.Loan_BankName);//p_LoanBankName  varchar(50),
	representation.push(req.body.Loan_BankBranch);//p_LoanBankBran  varchar(50),
	representation.push(req.body.Loan_IFSC);//p_LoanBankIFSCCode  varchar(15),
	representation.push(req.body.Loan_MICR);//p_LoanBankMICRCode  varchar(10),
	representation.push(req.body.Other_FirstName + req.body.Other_LastName);//p_OtherName  varchar(50),
	representation.push(req.body.Other_PAN);//p_OtherPAN  varchar(10),
	representation.push(req.body.Other_Aadhaar);//p_OtherAadhaar  varchar(15),
	representation.push(req.body.Other_BankAcNo);//p_OtherBankAccNo  varchar(20),
	representation.push(req.body.Other_Account_Type);//p_OtherBankAccType  varchar(50),
	representation.push(req.body.Other_BankName);//p_OtherBankName  varchar(50),
	representation.push(req.body.Other_BankBranch);//p_OtherBankBranch  varchar(50),
	representation.push(req.body.Other_IFSC);//p_OtherBankIFSCCode  varchar(15),
	representation.push(req.body.Other_MICR);//p_OtherBankMICRCode  varchar(10),
	representation.push(FBAID);//p_FBAID int,
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

	// var representation =  InsertUpdateFBARepresentation(data[0][0].FBAID,req,res,next);
	con.execute_proc('call InsertUpdateFBARepresentation(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',representation,function(respdata) {
		console.log(respdata);
	});
}

module.exports = insertFBARegistration;