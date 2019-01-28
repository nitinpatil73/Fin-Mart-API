
var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var RBLog  = require('../model/RBUpdateLoanLog.js');
var Mailer = require('../controller/MailController');
var logger=require('../bin/Logger');


var insertFBARegistration = function(req, res, next) {
	if(req.body.UID != null && req.body.UID != ''){
		//if(req.body.ss_id != null && req.body.ss_id != ''){
			if("1"=="1"){
			var fbadata = [];
			fbadata.push(req.body.Name);//FirsName`,
			fbadata.push("");//`LastName`,
			fbadata.push("");//`Gender`,
			fbadata.push("");//`DOB`,
			fbadata.push(req.body.Mobile);//`MobiNumb1`,
			fbadata.push("");//`MobiNumb2`,
			fbadata.push(req.body.Email);//`EmailID`,
			fbadata.push("");//`PinCode`,
			fbadata.push("");//`City`,
			fbadata.push("");//`StatID`,
			fbadata.push("R");//`FBAStat`,
			fbadata.push(0);//`SMID`,
			fbadata.push("");//`CustID`,
			fbadata.push(""); //referedby_code
			fbadata.push("");// version code
			fbadata.push("5"); // app sourse
			fbadata.push(0); // parent id
			fbadata.push(req.body.UID);
			con.execute_proc('call PolicybossInsertFBARegistration(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',fbadata,function(data) {
				if(data[0][0].SavedStatus == 0){
					//PolicybossLandmarkRegistration(data[0][0].fbaid,req, res, next);
					//RupeeBossFBARegistartion(data[0][0].fbaid,req, res, next);
					InsertFBAUsers(data[0][0].fbaid,req, res, next);
					InsertUpdateFBARepresentation(data[0][0].fbaid,req, res, next);
					InsertUpdateFBAProfessionalAuto(data[0][0].fbaid,req, res, next);
					  base.send_response(data[0][0].Message, data[0][0] ,res);
				}
				else{
						base.send_response(data[0][0].Message, null,res);				
				}
			});
		}else{
			base.send_response("ss_id not exists", null,res);
		}
	}else{
			base.send_response("UID not exists", null,res);
	}
};

// function PolicybossLandmarkRegistration(fbaid,req, res, next) {
// 	wrapper('/api/Agent','POST', {
// 		"EmpCode" : req.body.UID,
// 		"EmpName": req.body.FirstName,
// 		"EmailId":req.body.EmailId+"@policyboss.com",
// 		"MobileNumber":9999999999
// 	 }, function(data_Policyboss) {
// 	 		if(data_Policyboss>0){
// 	 			var landmarkuser = [];
// 		        landmarkuser.push(data_Policyboss); //p_fbaid        INT,
// 		        landmarkuser.push(fbaid); 
// 				con.execute_proc('call update_landmark_posp_no(?,?)',landmarkuser,function(pospdata) {
// 				});		  				
// 	 		}
// 	},22);
// }

function RupeeBossFBARegistartion(fbaid,req, res, next) {
	//console.log('--------RupeeBossFBARegistartion-------------');
	req.body.fbaid = fbaid;
	req.body.fromrb = 1;
var converteddata = {
		fbaid : req.body.fbaid,
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
  		UpdateLoanId(fbaid,data.result);	

  	}
  	else{
		var loan = new RBLog({ fbaid: fbaid,RequestString:req.body,IsActive:true });
		loan.save(function(err) {
			if(err){
				//console.log(err);
			};
		});
  	}
  },3);
}

function UpdateLoanId(fbaid,LoanId,req, res, next) {
	//console.log('--------UpdateLoanId 2-------------');
	var fbausers = [];
	fbausers.push(fbaid); //p_fbaid        INT,
	fbausers.push(LoanId); 
	con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
	});
}

function InsertFBAUsers(fbaid,req, res, next) {
	var fbausers = [];
	fbausers.push(fbaid); //p_fbaid        INT,
	fbausers.push(req.body.UID); 
	fbausers.push(""); //p_LifeComp     VARCHAR(50),
	fbausers.push(null); //p_IsGeneInsu   TINYINT,
	fbausers.push(""); //p_GeneComp     VARCHAR(50),
	fbausers.push(""); //p_IsHealthInsu TINYINT,
	fbausers.push(0); //p_HealthComp   VARCHAR(50),
	fbausers.push("");
	con.execute_proc('call spInsertFBAUsers(?,?,?,?,?,?,?,?)',fbausers,function(fbauserdata) {

	});
}


function InsertUpdateFBAProfessionalAuto(fbaid,req, res, next) {
	var personal = [];
	personal.push(fbaid); //p_fbaid        INT,
	personal.push(""); //p_IsLifeInsu   TINYINT,
	personal.push(""); //p_LifeComp     VARCHAR(50),
	personal.push(""); //p_IsGeneInsu   TINYINT,
	personal.push(""); //p_GeneComp     VARCHAR(50),
	personal.push(""); //p_IsHealthInsu TINYINT,
	personal.push(""); //p_HealthComp   VARCHAR(50),
	personal.push(""); //p_IsMutualFund TINYINT,
	personal.push(0); //p_IsStocks     TINYINT,
	personal.push(""); //p_IsPostSavi   TINYINT,
	personal.push(""); //p_IsBonds      TINYINT
	con.execute_proc('call InsertUpdateFBAProfessionalAuto(?,?,?,?,?,?,?,?,?,?,?)',personal,function(autodata) {
	});
}

function InsertUpdateFBARepresentation(fbaid,req, res, next){
var representation = [];
	representation.push("");//p_POSPPAN  varchar(10),
	representation.push("");//p_POSPPAN  varchar(10),
	representation.push("");//p_POSPAadhaar  varchar(15),
	representation.push("");//p_POSPBankAccNo  varchar(20),
	representation.push("");//p_POSPBankAccType  varchar(25),
	representation.push("");//p_POSPBankName  varchar(50),
	representation.push("");//p_POSPBankBran  varchar(50),
	representation.push("");//p_POSPBankIFSCCode  varchar(15),
	representation.push("");//p_POSPBankMICRCode  varchar(10),
	representation.push("");//p_LoanName  varchar(50),
	representation.push("");//p_LoanPAN  varchar(10),
	representation.push("");//p_LoanAadhaar  varchar(15),
	representation.push("");//p_LoanBankAccNo  varchar(20),
	representation.push("");//p_LoanBankAccType  varchar(50),
	representation.push("");//p_LoanBankName  varchar(50),
	representation.push("");//p_LoanBankBran  varchar(50),
	representation.push("");//p_LoanBankIFSCCode  varchar(15),
	representation.push("");//p_LoanBankMICRCode  varchar(10),
	representation.push("");//p_OtherName  varchar(50),
	representation.push("");//p_OtherPAN  varchar(10),
	representation.push("");//p_OtherAadhaar  varchar(15),
	representation.push("");//p_OtherBankAccNo  varchar(20),
	representation.push("");//p_OtherBankAccType  varchar(50),
	representation.push("");//p_OtherBankName  varchar(50),
	representation.push("");//p_OtherBankBranch  varchar(50),
	representation.push("");//p_OtherBankIFSCCode  varchar(15),
	representation.push("");//p_OtherBankMICRCode  varchar(10),
	representation.push(fbaid);//p_fbaid int,
	representation.push("");//p_ServTaxNo varchar(50),
	representation.push("");//p_POSPDOB DATETIME,
	representation.push("");//p_POSPGender CHAR(1),
	representation.push("");//p_POSPMobile1 VARCHAR(12),
	representation.push("");//p_POSPMobile2 VARCHAR(12),
	representation.push("");//p_POSPEmail VARCHAR(50),
	representation.push("");//p_POSPAddress1 VARCHAR(75),
	representation.push("");//p_POSPAddress2 VARCHAR(75),
	representation.push("");//p_POSPAddress3 VARCHAR(75),
	representation.push("");//p_POSPPinCode VARCHAR(6),
	representation.push("");//p_POSPCity VARCHAR(25),
	representation.push("");//p_POSPStatID SMALLINT,
	representation.push("");//p_POSPChanPartCode VARCHAR(20)
	representation.push(req.body.ss_id);//posp no
	con.execute_proc('call LandmarkInsertUpdateFBARepresentation(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',representation,function(respdata) {	
	});
}
module.exports = insertFBARegistration;