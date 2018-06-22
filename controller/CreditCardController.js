var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');
var randomstring = require("randomstring");


var creditCardRBL = function (req, res, next) {
var ConUniqRefCode = randomstring.generate(13);
wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
},function(dataresponse) {
if(dataresponse != null && dataresponse != ''){
var CreditCard={
		"Title": req.body.Title,
		"DOB": req.body.DOB,
		"FirstName": req.body.FirstName,
		"MiddleName": req.body.MiddleName,
		"LastName": req.body.LastName,
		"FatherName": req.body.FatherName,
    "email_id": req.body.email_id,
		"Gender": req.body.Gender,
		"HadLoanOrCreditCardFromAnyBank": req.body.HadLoanOrCreditCardFromAnyBank,
		"ResAddress1": req.body.ResAddress1,
		"ResAddress2": req.body.ResAddress2,
		"Landmark":req.body.Landmark,
		"ResCity": req.body.ResCity,
		"ResPIN": req.body.ResPIN,
		"Email": req.body.Email,
		"NMI": req.body.NMI,
		"Mobile":req.body.Mobile,
		"EmpType": req.body.EmpType,
		"PAN": req.body.PAN,
		"ConUniqRefCode": ConUniqRefCode,
		"Version": "6",
		"CreditCardApplied": req.body.CreditCardApplied,
		"CardType": req.body.CardType,
		"ProcessingFee": req.body.ProcessingFee,
		"brokerid": dataresponse,
    "fba_id":req.body.fba_id,
		"empid": "MAA=",
		"source": "RABDAA=="
    };
wrapper('/BankAPIService.svc/createRBLCreditCardReq', 'POST', {
		"CreditCard": CreditCard
  }, function(data) {
  	 console.log("--------------------------------createRBLCreditCardReq-------------------------------------")
  	 console.log(data);
    	if(data!=null){
  			var message = JSON.parse(data);
        console.log(message.Errorcode);
      //  if(message.Errorcode){
  			if(message.Errorcode==0){
    				var ApplnNo = message.ReferenceCode;	  			
  	  			console.log(ApplnNo);
  	  			saveCreditCardRequest(req.body.FirstName + " " +req.body.MiddleName + " " + req.body.LastName, req.body.Email,req.body.Mobile,req.body.fba_id,"1",ApplnNo,req.body.CardType,req.body.CreditCardDetailId);
  				  base.send_response("Thank you for choosing RBL Credit card. A has been sent to your registered Email id. Click on the link to upload your supporting documents.", message,res);	
    			 }
           else if(message.Errorcode==6){
              base.send_response("Duplicate : an application with the given details already exist , kindly try with another details.", null,res);  
           }        
    			else{
    				base.send_response("Error: Technical issue , Kindly try after some time.", null,res);	
    			}
      // }
      // else{
      //   base.send_response("Credential expired. Please contact customer support team.", null,res); 
      // }  			
  				
  		}
  		else{
				base.send_response("Failure", null,res);		
  		}
  },17); 
  }else{
    base.send_response("Broker Id does not exist","",res);
  }
},17);
};

var getCreditCardData = function(req, res, next){
		
		con.execute_proc('call CreditCardDetails()',null,function(data) {
		if(data!=null)
		{
			for (var i = 0; i < data[1].length; i++) {
			data[1][i].ImagePath = "http://"+ req.headers.host + "/images/creditcard/" + data[1][i].ImagePath;										
		}

			base.send_response("Success",{"filter":data[0],"filterdata":data[1]},res);
			//}		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}

function saveCreditCardRequest(Name, Email, Mobile,fba_id,CardType,ApplnNo,creditcardname,CreditCardDetailId){
		var parameter = [];
		parameter.push(Name);		
		parameter.push(Email);
		parameter.push(Mobile);
		parameter.push(fba_id);
		parameter.push(CardType);
    parameter.push(ApplnNo);
		parameter.push(creditcardname);
    parameter.push(CreditCardDetailId);
		con.execute_proc('call ManageCreditCardRequest(?,?,?,?,?,?,?,?)',parameter,function(data) {
   		});
}

var getSavedCreditCardInfo = function(req, res, next){
		var parameter = [];
		parameter.push(req.body.fba_id);
		if(req.body.CardType!="0"){
			parameter.push(req.body.CardType);
		}
		else{
			parameter.push(null);
		}
		
		con.execute_proc('call getSavedCreditCardInfo(?,?)',parameter,function(data) {
		if(data!=null)
		{
			base.send_response("Success",data[0],res);
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}

var creditCardICICI = function (req, res, next) {
wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
},function(Encoderesponse) {
if(Encoderesponse != null && Encoderesponse != ''){
    wrapper('/BankAPIService.svc/PostIciciBank', 'POST', {
		 "_token": "NQmw3jBZbZREEStAkGVZTby7eZqeWJEj4tf5UUET",
  "empid": "MAA=",
  "brokerid":Encoderesponse,
  "source":"RABDAA==",
  "prod": req.body.prod,
  "amount": req.body.amount,
  "interest": req.body.interest,
  "ApplicantFirstName": req.body.ApplicantFirstName,
  "ApplicantMiddleName": req.body.ApplicantMiddleName,
  "ApplicantLastName": req.body.ApplicantLastName,
  "DateOfBirth": req.body.DateOfBirth,
  "email_id": req.body.email_id,
  "NameOnCard": req.body.NameOnCard,
  "MotherName": req.body.MotherName,
  "no_of_dependents": req.body.no_of_dependents,
  "Gender": req.body.Gender,
  "marital_status": req.body.marital_status,
  "preferred_address": req.body.preferred_address,
  "resident_status": req.body.resident_status,
  "CustomerProfile": req.body.CustomerProfile,
  "supplementary_card":req.body.supplementary_card,
  "CompanyName": req.body.CompanyName,
  "Income": req.body.Income,
  "designation": req.body.designation,
  "work_email": req.body.work_email,
  "work_STDCode": req.body.work_STDCode,
  "work_number": req.body.work_number,
  "type_of_company": req.body.type_of_company,
  "highest_education": req.body.highest_education,
  "ICICIBankRelationship": req.body.ICICIBankRelationship,
  "Total_Exp": req.body.Total_Exp,
  "SalaryAccountWithOtherBank": req.body.SalaryAccountWithOtherBank,
  "ResidenceAddress1": req.body.ResidenceAddress1,
  "ResidenceAddress2": req.body.ResidenceAddress2,
  "ResidenceAddress3": req.body.ResidenceAddress3,
  "City": req.body.City,
  "ResidencePincode": req.body.ResidencePincode,
  "ResidenceState": req.body.ResidenceState,
  "type_current": req.body.type_current,
  "same": req.body.same,
  "PerResidenceAddress1": req.body.PerResidenceAddress1,
  "PerResidenceAddress2": req.body.PerResidenceAddress2,
  "PerResidenceAddress3": req.body.PerResidenceAddress3,
  "PerCity": req.body.PerCity,
  "PerResidencePincode": req.body.PerResidencePincode,
  "PerResidenceState": req.body.PerResidenceState,
  "per_res_type": req.body.per_res_type,
  "ResidencePhoneNumber": req.body.ResidencePhoneNumber,
  "ResidenceMobileNo": req.body.ResidenceMobileNo,
  "STDCode": req.body.STDCode,
  "have_credit_card": req.body.have_credit_card,
  "previous_bank": "",
  "credit_date": "",
  "credit_limit": "",
  "PanNo": req.body.PanNo,
  "SalaryAccountOpened": req.body.SalaryAccountOpened,
  "terms": req.body.terms,
  "type": "DC",
  "ChannelType": "RupeeBoss",
  "CampaignName": "Rupeeboss Online",
  "ICICIRelationshipNumber":req.body.ICICIRelationshipNumber
  }, function(data) {
    console.log("====================            icic             ==========================");
    console.log(data);
  		if(data!=null){
  			var message = JSON.parse(data);
  			var ApplnNo = message.ApplicationId;
        if(ApplnNo){
              saveCreditCardRequest(req.body.ApplicantFirstName + " " + req.body.ApplicantMiddleName + " " +req.body.ApplicantLastName, req.body.work_email, req.body.ResidenceMobileNo,req.body.fba_id,"2",ApplnNo,req.body.CardType,req.body.CreditCardDetailId)
              base.send_response(message.Reason, message,res);
        }
        else{
              base.send_response(message.ErrorMessage, null,res);  
        }
  		}
  		else{
				base.send_response("Failure", null,res);		
  		}
  },17);
  }else{
    base.send_response("Broker Id does not exist","",res);
  }
},17); 
};

//////////
var getRBLCity = function (req, res, next) {

wrapper('/BankAPIService.svc/GetRBLCCCitylist', 'GET', 		 
  {}, function(data) {
  	 console.log(data);
  		if(data!=null){
  			base.send_response("Success", data,res);		
  		}
  		else{
				base.send_response("Failure", null,res);		
  		}
   

  },6); 
};


module.exports = {"creditCardRBL":creditCardRBL,"getCreditCardData":getCreditCardData,"getSavedCreditCardInfo":getSavedCreditCardInfo,"creditCardICICI":creditCardICICI,"getRBLCity":getRBLCity};