var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var RBLog  = require('../model/RBUpdateLoanLog.js');
var Mailer = require('../controller/MailController');
var logger=require('../bin/Logger');

var SMFOSinsertFBARegistration = function(req, res, next) {
	con.execute_proc('call Get_SM_FOS(?)',req.body.count,function(responce) {
		if(responce != null && responce != ''){
			//console.log(responce);
			for (var i = 0; i < responce[0].length; i++) {
				var fbadata = [];
				fbadata.push(responce[0][i].Emp_Name);//FirsName`,
				fbadata.push("");//`LastName`,
				fbadata.push("");//`Gender`,
				fbadata.push("");//`DOB`,
				fbadata.push(responce[0][i].Mobile_Number);//`MobiNumb1`,
				fbadata.push("");//`MobiNumb2`,
				fbadata.push(responce[0][i].Email_Id);//`EmailID`,
				fbadata.push("");//`PinCode`,
				fbadata.push("");//`City`,
				fbadata.push("");//`StatID`,
				fbadata.push("");//`FBAStat`,
				fbadata.push("");//`SMID`,
				fbadata.push("");//`CustID`,
				fbadata.push("");
				fbadata.push("");
				fbadata.push("29");

				if(req.body.ParentId != null && req.body.ParentId != ''){
					fbadata.push(req.body.ParentId);
				}else{
					fbadata.push(0);
				}
				if(req.body.Pancard != null && req.body.Pancard != ''){
					fbadata.push(req.body.Pancard);
				}else{
					fbadata.push(null);
				}

				fbadata.push("");

				if(req.body.field_sales_uid != null && req.body.field_sales_uid != '')
				{
					fbadata.push(req.body.field_sales_uid);
				}else{
					fbadata.push(0);
				}
				fbadata.push(responce[0][i].DSACode); 
				fbadata.push(responce[0][i].SS_ID)

				// var UID = [];
				// UID.push(responce[0][i].DSACode);

				con.execute_proc('call InsertFBARegistrationSMFOSData(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',fbadata,function(data) {
					//console.log("--------------------");
					if(data[0][0].SavedStatus == 0){
						//console.log("--------------------");
						//console.log(data[0][0].UserIDN);
						InsertFBAUsers(data[0][0].FBAID,data[0][0].UserIDN,req, res, next);
						InsertUpdateFBARepresentation(data[0][0].FBAID,data[0][0].SS_ID,req, res, next);
						InsertUpdateFBAProfessionalAuto(data[0][0].FBAID,req, res, next);	
						updatefbaid(data[0][0].FBAID,data[0][0].UserIDN,req, res, next);
						RupeeBossFBARegistartion(data[0][0].FBAID,data[0][0].UserIDN,data[0][0].ename,data[0][0].emobile,data[0][0].eemail,req, res, next);
					}else{
						//console.log(data);
						//base.send_response(data[0][0].Message,null,res);				
					}
				});
			}
			base.send_response("Success","Success",res);
		}else{
			//console.log("failure");
		}
	});
}

function InsertFBAUsers(FBAID,UID,req, res, next) {
	//console.log("-----------DSACode 2------------");
	//console.log(UID);
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(UID); 
	fbausers.push(""); //p_LifeComp     VARCHAR(50),
	fbausers.push(UID);
	fbausers.push(""); //p_GeneComp     VARCHAR(50),
	fbausers.push(""); //p_IsHealthInsu TINYINT,
	fbausers.push(0); //p_HealthComp   VARCHAR(50),
	fbausers.push("");
	con.execute_proc('call spInsertFBAUsersSMFOSData(?,?,?,?,?,?,?,?)',fbausers,function(fbauserdata) {

	});
}

function InsertUpdateFBARepresentation(FBAID,SS_ID,req, res, next){
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
	representation.push(SS_ID);  //posp No
	con.execute_proc('call InsertUpdateFBARepresentationSMFOSData(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',representation,function(respdata) {

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

function updatefbaid(FBAID,UID,req, res, next) {
	var ufbaid = [];
	ufbaid.push(FBAID); //p_FBAID        INT,
	ufbaid.push(UID); 
	con.execute_proc('call update_SMFOSData_fbaid(?,?)',ufbaid,function(rdata) {

	});
}

function RupeeBossFBARegistartion(FBAID,UID,ename,emobile,eemail,req, res, next) {
	wrapper('/LoginDtls.svc/XMLService/updateFBALoanId', 'POST', {
   "fbaid" : req.body.fbaid
  }, function(data) {
  	//	console.log("*************************data***************************");
	//	console.log(data);
    if(data!=null && data.loanId != 0 && data.loanId != ''){
    	//console.log("-------------------data.loanId---------------------");
 		//console.log(data.loanId);
    var loan = [];
	loan.push(req.body.fbaid); //p_FBAID        INT,
	loan.push(data.loanId); 
	con.execute_proc('call UpdateLoanId(?,?)',loan,function(loandata) {
		if(loandata!=null && loandata[0][0].SavedStatus==0){
				base.send_response("Loan Id updated successfully!",loandata[0],res);
		}
		else{
			base.send_response(loandata[0][0].Message,null,res);
		}
	});
    }
    else{
    	GetFBAData(FBAID,UID,ename,emobile,eemail,req, res, next);
        //base.send_response("failure",null, res);
    }
  },3);

}

function GetFBAData(FBAID,UID,ename,emobile,eemail,req, res, next) {
	// req.body.FBAID = FBAID;
	// req.body.fromrb = 1;
var converteddata = {
		FBAId : FBAID,
        First_Name : ename,
        Last_Name : "",
        DOB : "",
        Mobile_No1 : emobile,
        Mobile_No2 : "",
        Email : eemail,

        Address1 : "",
        Address2 : "",
        Address3 : "",
        Pincode : "",
        City : "",
        State : "",

        Life_Insurance : "false",
        Life_Insurance_Comp : "",
        General_Insurance :"false",
        General_Insurance_Comp : "",
        Health_Insurance : "false",
        Health_Insurance_Comp : "",
        Mutual_Fund : "false",
        Mutual_Fund_Comp : "",
        Stocks : "false",
        Stocks_Comp : "",
        Postal_Savings : "false",
        Postal_Savings_Comp : "",
        Bonds : "false",
        Bonds_Comp : "",

        POSP_First_Name : "",
        POSP_Last_Name : "",
        POSP_Pan_No : "",
        POSP_Aadhar_Card_No : "",
        POSP_Bank_Accnt_No : "",
        POSP_Accnt_Type : "",
        POSP_IFSC_Code : "",
        POSP_MICR_Code : "",
        POSP_Bank_Name : "",
        POSP_Bank_Branch : "",
        POSP_Bank_City : "",

        Representative_First_Name : "",
        Representative_Last_Name : "",
        Representative_Pan_Nov : "",
        Representative_Aadhar_Card_No : "",
        Representative_Bank_Accnt_No : "",
        Representative_Accnt_Type : "",
        Representative_IFSC_Code : "",
        Representative_MICR_Code : "",
        Representative_Bank_Name : "",
        Representative_Bank_Branch : "",
        Representative_Bank_City : "",
        regsource : 1,
        UID :"0"
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
				//console.log(err);
			};
		});
  	}
  },3);
}

function UpdateLoanId(FBAID,LoanId,req, res, next) {
	//console.log("----------------loan id 5-----------------------");
	//console.log(LoanId);
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(LoanId); 
	con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
	});
}

module.exports = SMFOSinsertFBARegistration;