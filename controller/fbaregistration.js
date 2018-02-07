// var express = require('express');
// var router = express.Router();
// var response_status = require('./responsestatus');
var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var RBLog  = require('../model/RBUpdateLoanLog.js');
var Mailer = require('../controller/MailController');
var logger=require('../bin/Logger');
var insertFBARegistration = function(req, res, next) {

//res.send("success");

// console.log(res.body);
var fbadata = [];
//console.log(req.body.FirstName);
fbadata.push(req.body.FirstName);//FirsName`,
fbadata.push(req.body.LastName);//`LastName`,
fbadata.push(req.body.Gender);//`Gender`,
fbadata.push(req.body.DOB);//`DOB`,
fbadata.push(req.body.Mobile_1);//`MobiNumb1`,
fbadata.push(req.body.Mobile_2);//`MobiNumb2`,
fbadata.push(req.body.EmailId);//`EmailID`,
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
		RupeeBossFBARegistartion(data[0][0].FBAID,req, res, next);
		InsertFBAUsers(data[0][0].FBAID,req, res, next);
		InsertUpdateFBARepresentation(data[0][0].FBAID,req, res, next);
		InsertUpdateFBAProfessionalAuto(data[0][0].FBAID,req, res, next);
		SetCustomerId(data[0][0].FBAID,req, res, next);
		base.send_response(data[0][0].Message, data[0][0] ,res);
	}
	else{
			base.send_response(data[0][0].Message, null,res);				
	}
});

};




function RupeeBossFBARegistartion(FBAID,req, res, next) {
	req.body.FBAID = FBAID;
	req.body.fromrb = 1;



var converteddata = {
		FBAId : req.body.FBAID,
        First_Name : req.body.FirstName,
        Last_Name : req.body.LastName,
        DOB : req.body.DOB,
        Mobile_No1 : req.body.Mobile_1,
        Mobile_No2 : req.body.Mobile_2,
        Email : req.body.EmailId,

        Address1 : req.body.Address_1,
        Address2 : req.body.Address_2,
        Address3 : req.body.Address_3,
        Pincode : req.body.PinCode,
        City : req.body.City,
        State : req.body.State,

        Life_Insurance : req.body.IsLic,
        Life_Insurance_Comp : req.body.LIC_Comp,
        General_Insurance : req.body.IsGic,
        General_Insurance_Comp : req.body.GIC_Comp,
        Health_Insurance : req.body.IsHealth,
        Health_Insurance_Comp : req.body.Health_Comp,
        Mutual_Fund : req.body.MF,
        Mutual_Fund_Comp : req.body.MF_Comp,
        Stocks : req.body.Stock,
        Stocks_Comp : req.body.Stock_Comp,
        Postal_Savings : req.body.Postal,
        Postal_Savings_Comp : req.body.Postal_Comp,
        Bonds : req.body.Bonds,
        Bonds_Comp : req.body.Bonds_Comp,

        POSP_First_Name : req.body.Posp_FirstName,
        POSP_Last_Name : req.body.Posp_LastName,
        POSP_Pan_No : req.body.Posp_PAN,
        POSP_Aadhar_Card_No : req.body.Posp_Aadhaar,
        POSP_Bank_Accnt_No : req.body.Posp_BankAcNo,
        POSP_Accnt_Type : req.body.Posp_Account_Type,
        POSP_IFSC_Code : req.body.Posp_IFSC,
        POSP_MICR_Code : req.body.Posp_MICR,
        POSP_Bank_Name : req.body.Posp_BankName,
        POSP_Bank_Branch : req.body.Posp_BankBranch,
        POSP_Bank_City : req.body.Posp_BankCity,

        Representative_First_Name : req.body.Loan_FirstName,
        Representative_Last_Name : req.body.Loan_LastName,
        Representative_Pan_Nov : req.body.Loan_PAN,
        Representative_Aadhar_Card_No : req.body.Loan_Aadhaar,
        Representative_Bank_Accnt_No : req.body.Loan_BankAcNo,
        Representative_Accnt_Type : req.body.Loan_Account_Type,
        Representative_IFSC_Code : req.body.Loan_IFSC,
        Representative_MICR_Code : req.body.Loan_MICR,
        Representative_Bank_Name : req.body.Loan_BankName,
        Representative_Bank_Branch : req.body.Loan_BankBranch,
        Representative_Bank_City : req.body.Loan_BankCity,
        fromrb : 1
	};
	
	console.log(converteddata);

	
	wrapper('/LoginDtls.svc/xmlservice/insFbaRegistrationForDC', 'POST', 
    converteddata
  , function(data) {
  	console.log("LoanId"+data.result);
  	if(data.statusId == 0){
  		UpdateLoanId(FBAID,data.result);
  	}
  	else{
		var loan = new RBLog({ FBAId: FBAID,RequestString:req.body,IsActive:true });
		loan.save(function(err) {
			if(err){
				console.log(err);
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
		sendRegistrationEmail(req);
		sendBecomePOSP(req);
		console.log(fbauserdata);
	});
	// console.log(personal);
}

function sendEmail(to,subject,text,htmlbody){
	var email = {
        "to": to, 
        "subject": subject, 
        "text": text, 
        "html": htmlbody     
	}

	Mailer.send(email,function(status){
      if(status===1){
          console.log("Mail send success");
      }else{
         console.log(subject +" :Mail send fail: "+status);
         logger.error('error', subject +" :Mail send fail: "+status, subject +" :Mail send fail: "+status);
		// logger.log(subject +" :Mail send fail: "+status);
      }
    });

}
function sendRegistrationEmail(req) {

	var emailTemplate = "<span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Dear Mr.&nbsp;</span><b style='color: #222222; font-family: Arial; font-size: 13.3333px'>{{name}}</b><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>,</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Welcome to Magic-Finmart and congratulations on successfully registering as a Magic-Finmart Business Associate.</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Your Magic-Finmart id is&nbsp;</span><b style='color: #222222; font-family: Arial; font-size: 13.3333px'><a href='mailto:{{mailto}}' target='_blank' style='color: #1155cc'>{{email}}</a></b><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>&nbsp;&amp; password is&nbsp;</span><b style='color: #222222; font-family: Arial; font-size: 13.3333px'>{{password}}</b><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>We thank you for associating with us on the platform and assure you of our best services at all times.</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Warm Regards,</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Magic Finmart Team</span><div class='yj6qo' style='color: #222222; font-family: Arial; font-size: 13.3333px'></div><div><span style='color: #222222; font-family: Arial; font-size: 13.3333px'><br /> </span></div>";
	emailTemplate = emailTemplate.replace("{{name}}",req.body.FirstName + ' ' + req.body.LastName);
	emailTemplate = emailTemplate.replace("{{email}}",req.body.EmailId);
	emailTemplate = emailTemplate.replace("{{mailto}}",req.body.EmailId);
	emailTemplate = emailTemplate.replace("{{password}}",req.body.password);
	sendEmail(req.body.EmailId,"Finmart Business Associate","",emailTemplate);
	 
	
	// req.body.password
}


function sendBecomePOSP(req) {
	var emailTemplate_posp = "<div class='gmail_quote' style='color: #222222; font-family: arial, sans-serif; font-size: 12.8px'><div><table style='font-family: Arial, sans-serif; font-size: 14px; padding: 25px 0px 0px 25px; color: #000000'><tbody><tr><td style='font-family: arial, sans-serif'><p>Dear Mr.&nbsp;<b>{{name}}</b></p><p>Thank you very much for registering on the Magic Finmart Platform. As you will probably be aware the platform offers you the option of selling multiple products from multiple vendors.<br />However to unlock the full potential of the platform you will need to comply with IRDA norms for selling Insurance products and you can do the same by becoming a POSP with Landmark Insurance Brokers.</p><p><strong>Why you should become a POSP:</strong></p><p>IRDA Approved Sales Channel</p><p>Code (using Aadhar No) registered with IRDA</p><p>Name/Aadhar No appears on the policy document (guaranteeing renewals)</p><p>By registering as a POSP with a broker you get access to all insurance companies (you can offer choice of insurers to your customers)</p><p>POSP Life/GI can sell both Life &amp; GI products</p><p><strong>To become a POSP:</strong></p><p>you must be 18 years &amp; above</p><p>you must have education of 10th Std &amp; above</p><p>you must submit Pan/Aadhar/Photo/Education Proof</p><p>you must undergo 15 hours training and write a small exam</p><p><strong>you must not be an agent of any insurance company</strong></p><p>You can initiate the process by going to the main menu of your Finmart App and go to POSP enrolment to start the process.&nbsp;<br />In case you need any help you may reach out to our FBA Support Centre at 022-66048200.</p><p>We thank you for associating with us on the platform and assure you of our best services at all times.</p><p>Warm Regards,<br />Magic Finmart Team</p></td></tr></tbody></table><br /><div class='yj6qo'></div><div class='adL'></div></div><div class='adL'></div></div>";
	emailTemplate_posp = emailTemplate_posp.replace("{{name}}",req.body.FirstName + ' ' + req.body.LastName);
	sendEmail(req.body.EmailId,"Become a POSP with Landmark Insurance","",emailTemplate_posp);
	console.log(emailTemplate_posp);
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

 function SetCustomerId(fbaid,req, res, next) {
	var inputInfo = {
		CustType : "1",
		Gender : req.body.Gender,// m for male ;f for female
		CompName : "",// Company name
		FirstName : req.body.FirstName,// "Sidheswar";
		MiddleName : "",
		LastName : req.body.LastName,//"Senapati";
		Add1 : req.body.Address_1,// "jogeswari";
		Add2 : req.body.Address_2, // "Mumbai";
		Add3 : req.body.Address_3,// "Mumbai";
		Pincode : req.body.PinCode,// "400062";
		STDCode : "",
		LandLine : "",
		City : req.body.City,// "Mumbai";
		Division : "",
		Branch : "",
		Mobile1 : req.body.Mobile_1,// "9938885469";
		Mobile2 : req.body.Mobile_2,// "";
		EmailId1 : req.body.EmailId,// "sidheswar@datacompwebtech.com";
		EmailId2 : "",
		DOB : req.body.DOB,// "06-Jun-1989";
		MarrDate : "",
		PartId : "0",
		DOCode : "",
		DOName : "",
		Flag : "F",// For finmart
		USERID : "0",
		Rating : ""
	};


	var authenticateInputInfo = {
		AppID : "171",
		AppUSERID : "3OK92Dl/LwA0HqfC5+fCxw==",
		AppPASSWORD : "BjLfd1dqTCyH1DQLhylKRQ=="
	};


    var soap = require('soap');
    var url = 'http://magicsales.dwtsims.com/WCFServices/WCFServices.svc?wsdl';
    var args = { "inputInfo" :inputInfo , "authenticateInputInfo" : authenticateInputInfo };
    console.log(args);
    var message = "success";
    soap.createClient(url, function (err, client) {
        client.CreateCustomer(args, function (err, result) {
          if(err)
          	console.log(err);
          else
          	{
          		if(result){
          			if(result.CreateCustomerResult.Status=="1"){
          				var customer = [];
						customer.push(result.CreateCustomerResult.CustID);
						customer.push(fbaid);

          				con.execute_proc('call sp_update_CustIdAndFOC(?,?)',customer,function(respdata) {
							console.log(respdata);
						});
          			}
          			else if(result.CreateCustomerResult.Status=="2"){
          				console.log(result.CreateCustomerResult.MSG);
          			}
          			else{
          				console.log(result.CreateCustomerResult.MSG);
          			}
          		}

          	}
        });
    });
        
};

module.exports = insertFBARegistration;