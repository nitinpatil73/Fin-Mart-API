var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var app = require('./wrapper.js');
var pospComman=require('./POSPCommanController');
var pospregistration = function(req, res, next) {

	con.execute_proc('call sp_Ins_UpPOSPInfo(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',POSPRegistration(req),function(respdata) {
		console.log(respdata[0]);
		if(respdata[0][0].SavedStatus == 0){
			console.log(respdata[0]);
			if(req.body.POSPID && req.body.POSPID>0){
				// respdata[0][0].PaymentURL = "http://rupeeboss.com";
				// respdata[0][0].PospNo = "377";
				base.send_response(respdata[0][0].Message, respdata[0][0] ,res);				
			}
			else{
				SaveFBADetaPolicyBoss(req,res,next);
			}
			//base.send_response(respdata[0][0].Message, respdata[0][0] ,res);
		}
		else{

				base.send_response(respdata[0][0].Message, null,res);				
		}	
	});
};


function SaveFBADetaPolicyBoss(req,res,next){

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
	    CityID : req.body.City
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

	// var fbaRegePolicyBossInfo = {
	// 	FBAID : req.body.FBAID,
	// 	SM_POSP_ID : req.body.SMID,
	// 	SM_POSP_Name : req.body.SM_Name,
	// 	BasicDetails : basicDetails,
	// 	Address : address,
	// 	Presentation : presentation,
	// 	Nominee : nominee

	// };
	// console.log(BasicDetails);
		app('/quotes/api/pospregistration', 'POST', {
		    FBAID : req.body.FBAID,
			SM_POSP_ID : req.body.SMID,
			SM_POSP_Name : req.body.SM_Name,
			BasicDetails : basicDetails,
			Address : address,
			Presentation : presentation,
			Nominee : nominee
	  }, function(data) {
	  	console.log("............data..............");
	  	if(data!=null){	  		
	  		if(data=="Email Id already exists"){
	  			base.send_response("Email Id already exists", null,res);
	  		}
	  		else{
	  			console.log("............data 1..............");
	  			console.log(data);
	  			var pospparam= [];
	  			pospparam.push(req.body.FBAID);
	  			pospparam.push(data);
	  				con.execute_proc('call UpdatePOSPNO(?,?)',pospparam,function(respdata) {
					console.log(".....UpdatePOSPNO......");

					console.log(respdata[0]);
					if(respdata[0][0].SavedStatus == 0){
						if(respdata[0][0].Link){
							base.send_response("Sucess", respdata[0][0],res);	
						}else{
							pospComman.GetProdPriceDeta(respdata[0][0].CustID,respdata[0][0].MobiNumb1,respdata[0][0].FullName,respdata[0][0].EmailID,req.body.FBAID,res,data,function(pay_data,status){
							console.log(pay_data);
							if(status==0){
			  					console.log("Failure......................")

			  						base.send_response(pay_data, null,res);	
				  				}else{
				  					console.log("Success.......................")
				  					base.send_response("Success", pay_data,res);	
				  				}

				  				
							});		
						}
								
					}
					else{
							base.send_response(respdata[0][0].Message, null,res);				
					}	
				});
	  		}
	  	}
	  	else{	  		
	  		base.send_response("Invalid request", null,res);
	  	}
	  },2);
}

function POSPRegistration(req){
	var representation = [];
	if(req.body.FBAID){
		representation.push(req.body.FBAID);
	}
	else{
		representation.push(0);
	}
	representation.push(req.body.Posp_FirstName + " " + req.body.Posp_LastName );//p_POSPPAN  varchar(10),
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
	representation.push(req.body.Posp_BankCity);
	console.log(representation);
	return representation;
	// var representation =  InsertUpdateFBARepresentation(data[0][0].FBAID,req,res,next);
	
}


var GetPOSPDetails = function(req, res, next){
		var GetPOSPDetailsParameter = [];
		GetPOSPDetailsParameter.push(req.body.FBAID);	//
		console.log(GetPOSPDetailsParameter);
		con.execute_proc('call GetPOSPDetails(?)',GetPOSPDetailsParameter,function(data) {	
			if(data!=null && data[0].length>0){
			 var doc_available = data[1];		
			 var response = data[0];
			for (var i = 0 ; i < data[1].length; i++) {
				
				if(data[1][i].FileName!=null &&data[1][i].FileName!=""){
					console.log(data[1][i].FileName+"-----------------");
					data[1][i].FileName ="http://"+ req.headers.host + "/upload/"+ data[1][i].FileName;
				}				
			}
			console.log(response[0].Posp_Profile_Url);
			if(response[0].Posp_Profile_Url !=null && response[0].Posp_Profile_Url!=""){
				response[0].Posp_Profile_Url ="http://"+  req.headers.host + "/upload/"+ response[0].Posp_Profile_Url;
			} 
			 response[0].doc_available = doc_available;
			base.send_response("Success",response,res);
		}
		else{
			base.send_response("No POSP Found", null,res);
		}	
   	});
}


module.exports = {"pospregistration":pospregistration,"GetPOSPDetails":GetPOSPDetails};