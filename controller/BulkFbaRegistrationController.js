var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var RBLog  = require('../model/RBUpdateLoanLog.js');
var Mailer = require('../controller/MailController');
var logger=require('../bin/Logger');

var BulkInsertFBARegistration = function(req, res, next) {
	con.execute_proc('call temp_bulk_fba_data()',null,function(bulkdata) {
		function wait(milleseconds) {
		  	return new Promise(resolve => setTimeout(resolve, milleseconds))
		}
		async function send(bulkdata) {
			for (var i = 0; i < bulkdata[0].length; i++) {
				RupeeBossFBARegistartion(bulkdata[0][i].FBAID,bulkdata[0][i].UID,req, res, next);
				// var fbadata = [];
				// fbadata.push(bulkdata[0][i].Emp_Name);//FirsName`,
				// fbadata.push("");//`LastName`,
				// fbadata.push("");//`Gender`,
				// fbadata.push("");//`DOB`,
				// fbadata.push(bulkdata[0][i].Mobile);//`MobiNumb1`,
				// fbadata.push("");//`MobiNumb2`,
				// fbadata.push(bulkdata[0][i].Email_Id);//`EmailID`,
				// fbadata.push("");//`PinCode`,
				// fbadata.push("");//`City`,
				// fbadata.push("");//`StatID`,
				// fbadata.push("R");//`FBAStat`,
				// fbadata.push("");//`SMID`,
				// fbadata.push("");//`CustID`,
				// fbadata.push("");
				// fbadata.push("");
				// fbadata.push("5");
				// fbadata.push(0);
				// fbadata.push(null);
				// var headerreq = req.header("apptype") ;
				// if(headerreq == 'rba')
				// {
				//     fbadata.push('rba');
				// }
				// else
				// {
				// 	fbadata.push('finmart');
				// }
				// fbadata.push(0);
				// fbadata.push(bulkdata[0][i].UID);
				// fbadata.push(bulkdata[0][i].SS_ID);
				// 	con.execute_proc('call BulkInsertFBARegistration(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',fbadata,function(data) {
				// 		//console.log("---------------2----------------------");
				// 		//console.log(data);
				// 		if(data[0][0].SavedStatus == 0){

				// 			console.log("---------------1----------------------");
				// 			RupeeBossFBARegistartion(data[0][0].FBAID,req, res, next);
				// 			InsertFBAUsers(data[0][0].FBAID,data[0][0].UID,req, res, next);
				// 			InsertUpdateFBARepresentation(data[0][0].FBAID,data[0][0].POSPNo,req, res, next);
				// 			InsertUpdateFBAProfessionalAuto(data[0][0].FBAID,req, res, next);
				// 			UpdateFbaId(data[0][0].FBAID,data[0][0].UID,req, res, next);
				// 			//base.send_response(data[0][0].Message, data[0][0] ,res);
				// 		}else{
				// 			//console.log("---------------2----------------------");
				// 			base.send_response("failure",null,res);				
				// 		}
				// 	});
				await wait(9000);
			}
		}
		send(bulkdata);
		base.send_response("success","success",res);
	});
};


function RupeeBossFBARegistartion(FBAID,UID,req, res, next) {
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
        UID :UID
	};
	var apiname = "/LoginDtls.svc/xmlservice/insFbaRegistration";
	wrapper(apiname, 'POST', 
    converteddata
  , function(data) {
  	if(data.statusId == 0){
  		UpdateLoanId(FBAID,data.result);	
  	}
  	else{
		var loan = new RBLog({ FBAId: FBAID,RequestString:req.body,IsActive:true });
		loan.save(function(err) {
			if(err){
			};
		});
  	}
  },3);
}

function UpdateLoanId(FBAID,LoanId,req, res, next) {
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(LoanId); 
	con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
	});
}

function InsertFBAUsers(FBAID,UID,req, res, next) {
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(UID); 
	fbausers.push(""); //p_LifeComp     VARCHAR(50),
	fbausers.push(UID); //p_IsGeneInsu   TINYINT,
	fbausers.push(""); //p_GeneComp     VARCHAR(50),
	fbausers.push(""); //p_IsHealthInsu TINYINT,
	fbausers.push(0); //p_HealthComp   VARCHAR(50),
	fbausers.push("");
	con.execute_proc('call spInsertFBAUsers(?,?,?,?,?,?,?,?)',fbausers,function(fbauserdata) {

	});
}


function InsertUpdateFBARepresentation(FBAID,POSPNo,req, res, next){
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
	representation.push(FBAID);//p_FBAID int,
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
	representation.push(POSPNo);//p_pospno VARCHAR(20)
	con.execute_proc('call BulkInsertUpdateFBARepresentation(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',representation,function(respdata) {
	});
}

function InsertUpdateFBAProfessionalAuto(FBAID,req, res, next) {
	var personal = [];
	personal.push(FBAID); //p_FBAID        INT,
	personal.push(""); //p_IsLifeInsu   TINYINT,
	personal.push(""); //p_LifeComp     VARCHAR(50),
	personal.push(""); //p_IsGeneInsu   TINYINT,
	personal.push(""); //p_GeneComp     VARCHAR(50),
	personal.push(""); //p_IsHealthInsu TINYINT,
	personal.push(""); //p_HealthComp   VARCHAR(50),
	personal.push(""); //p_IsMutualFund TINYINT,
	personal.push(""); //p_IsStocks     TINYINT,
	personal.push(""); //p_IsPostSavi   TINYINT,
	personal.push(""); //p_IsBonds      TINYINT
	con.execute_proc('call InsertUpdateFBAProfessionalAuto(?,?,?,?,?,?,?,?,?,?,?)',personal,function(autodata) {
		//console.log(autodata);
	});
}

function UpdateFbaId(FBAID,UID,req, res, next){
	var updatefba = [];
	updatefba.push(FBAID);
	updatefba.push(UID);
	con.execute_proc('call update_bulk_fbaid(?,?)',updatefba,function(resdata){
		//console.log(resdata);
	})
}
module.exports = {"BulkInsertFBARegistration":BulkInsertFBARegistration};