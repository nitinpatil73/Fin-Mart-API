
var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var RBLog  = require('../model/RBUpdateLoanLog.js');
var Mailer = require('../controller/MailController');
var logger=require('../bin/Logger');
var insertFBARegistration = function(req, res, next) {
var fbadata = [];
fbadata.push(req.body.FirstName);//FirsName`,
fbadata.push(req.body.LastName);//`LastName`,
fbadata.push(req.body.Gender);//`Gender`,
fbadata.push(req.body.DOB);//`DOB`,
fbadata.push(req.body.Mobile_1);//`MobiNumb1`,
fbadata.push(req.body.Mobile_2);//`MobiNumb2`,
fbadata.push(null);//`EmailID`,
fbadata.push(req.body.PinCode);//`PinCode`,
fbadata.push(req.body.City);//`City`,
fbadata.push(req.body.StateID);//`StatID`,
fbadata.push("R");//`FBAStat`,
fbadata.push(req.body.SMID);//`SMID`,
fbadata.push(req.body.CustID);//`CustID`,
fbadata.push(req.body.referedby_code);
fbadata.push(req.body.VersionCode);
fbadata.push(req.body.AppSource);

if(req.body.ParentId != null && req.body.ParentId != '')
{
	fbadata.push(req.body.ParentId);
}
else
{
	fbadata.push(0);
}

fbadata.push(req.body.userid);
con.execute_proc('call LandmarkInsertFBARegistration(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',fbadata,function(data) {
	if(data[0][0].SavedStatus == 0){
		PolicybossLandmarkRegistration(data[0][0].FBAID,req, res, next);
		RupeeBossFBARegistartion(data[0][0].FBAID,req, res, next);
		InsertFBAUsers(data[0][0].FBAID,req, res, next);
		InsertUpdateFBARepresentation(data[0][0].FBAID,req, res, next);
		InsertUpdateFBAProfessionalAuto(data[0][0].FBAID,req, res, next);
		  base.send_response(data[0][0].Message, data[0][0] ,res);
	}
	else{
			base.send_response(data[0][0].Message, null,res);				
	}
});
};

function PolicybossLandmarkRegistration(FBAID,req, res, next) {
	wrapper('/api/Agent','POST', {
		"EmpCode" : req.body.UID,
		"EmpName": req.body.FirstName,
		"EmailId":req.body.EmailId+"@policyboss.com",
		"MobileNumber":9999999999
	 }, function(data_Policyboss) {
	 		if(data_Policyboss>0){
	 			var landmarkuser = [];
		        landmarkuser.push(data_Policyboss); //p_FBAID        INT,
		        landmarkuser.push(FBAID); 
				con.execute_proc('call update_landmark_posp_no(?,?)',landmarkuser,function(pospdata) {
				});		  				
	 		}
	},22);
}

function RupeeBossFBARegistartion(FBAID,req, res, next) {
	//console.log('--------RupeeBossFBARegistartion-------------');
	req.body.FBAID = FBAID;
	req.body.fromrb = 1;
var converteddata = {
		FBAId : req.body.FBAID,
        "First_Name": "",
	   "Last_Name": "",
	   "DOB": "",
	   "Mobile_No1": "",
	   "Mobile_No2": "",
	   "Email": "",
	   "Address1": "",
	   "Address2": "",
	   "Address3": "",
	   "Pincode": "",
	   "City": "",
	   "State": "",
	   "Life_Insurance": "0",
	   "Life_Insurance_Comp": "",
	   "General_Insurance": "0",
	   "General_Insurance_Comp": "",
	   "Health_Insurance": "0",
	   "Health_Insurance_Comp": "",
	   "Mutual_Fund": "0",
	   "Mutual_Fund_Comp": "",
	   "Stocks": "0",
	   "Stocks_Comp": "",
	   "Postal_Savings": "0",
	   "Postal_Savings_Comp": "",
	   "Bonds": "0",
	   "Bonds_Comp": "",
	   "POSP_First_Name": "",
	   "POSP_Last_Name": "",
	   "POSP_Pan_No": "",
	   "POSP_Aadhar_Card_No": "",
	   "POSP_Bank_Accnt_No": "",
	   "POSP_Accnt_Type": "",
	   "POSP_IFSC_Code": "",
	   "POSP_MICR_Code": "",
	   "POSP_Bank_Name": "",
	   "POSP_Bank_Branch": "",
	   "POSP_Bank_City": "",
	   "Representative_First_Name": "",
	   "Representative_Last_Name": "",
	   "Representative_Pan_Nov": "",
	   "Representative_Aadhar_Card_No": "",
	   "Representative_Bank_Accnt_No": "",
	   "Representative_Accnt_Type": "",
	   "Representative_IFSC_Code": "",
	   "Representative_MICR_Code": "",
	   "Representative_Bank_Name": "",
	   "Representative_Bank_Branch": "",
	   "Representative_Bank_City": "",
        regsource : 1,
        UID : req.body.UID
	};
	var apiname = "/LoginDtls.svc/xmlservice/insFbaRegistration";

	if(process.env.NODE_ENV == 'development'){
		apiname = "/LoginDtls.svc/xmlservice/insFbaRegistrationForDC";
	}
	wrapper(apiname, 'POST', 
    converteddata
  , function(data) {
	//console.log('--------UpdateLoanId data-------------');
	//console.log(data);

  	if(data.statusId == 0){
  		//console.log('--------UpdateLoanId 1-------------');
  		UpdateLoanId(FBAID,data.result);	

  	}
  	else{
		var loan = new RBLog({ FBAId: FBAID,RequestString:req.body,IsActive:true });
		loan.save(function(err) {
			if(err){
				//console.log(err);
			};
		});
  	}
  },3);
}

function UpdateLoanId(FBAID,LoanId,req, res, next) {
	//console.log('--------UpdateLoanId 2-------------');
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(LoanId); 
	con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
	});
}

function InsertFBAUsers(FBAID,req, res, next) {
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(req.body.EmailId); 
	fbausers.push(""); //p_LifeComp     VARCHAR(50),
	fbausers.push(null); //p_IsGeneInsu   TINYINT,
	fbausers.push(""); //p_GeneComp     VARCHAR(50),
	fbausers.push(""); //p_IsHealthInsu TINYINT,
	fbausers.push(0); //p_HealthComp   VARCHAR(50),
	fbausers.push("");
	con.execute_proc('call spInsertFBAUsers(?,?,?,?,?,?,?,?)',fbausers,function(fbauserdata) {

	});
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
	con.execute_proc('call InsertUpdateFBARepresentation(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',representation,function(respdata) {
		
	});
}
module.exports = insertFBARegistration;