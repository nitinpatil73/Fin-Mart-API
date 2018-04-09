var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var SmartTermLifeParameter = function(req, res, next) {
		wrapper('/quotes/api/SmartTermLife', 'POST', {
		   	 "PolicyTerm": req.body.termRequestEntity.PolicyTerm,
		     "InsuredGender": req.body.termRequestEntity.InsuredGender,
		     "Is_TabaccoUser": req.body.termRequestEntity.Is_TabaccoUser,
		     "SumAssured": req.body.termRequestEntity.SumAssured,
		     "InsuredDOB": req.body.termRequestEntity.InsuredDOB,
		     "PaymentModeValue": req.body.termRequestEntity.PaymentModeValue,
		     "PolicyCommencementDate": req.body.termRequestEntity.PolicyCommencementDate,
		     "CityName": req.body.termRequestEntity.CityName,
		     "State": req.body.termRequestEntity.State,
		     "PlanTaken": req.body.termRequestEntity.PlanTaken,
		     "Frequency": req.body.termRequestEntity.Frequency,
		     "DeathBenefitOption": req.body.termRequestEntity.DeathBenefitOption,
		     "PPT": req.body.termRequestEntity.PPT,
		     "IncomeTerm": req.body.termRequestEntity.IncomeTerm,

		     "MonthlyIncome": req.body.termRequestEntity.MonthlyIncome,
		     "LumpsumAmount": req.body.termRequestEntity.LumpsumAmount,
		     "IncreaseIncomePercentage": req.body.termRequestEntity.IncreaseIncomePercentage,
		     "IncreaseSAPercentage": req.body.termRequestEntity.IncreaseSAPercentage,
		     "ADBPercentage": req.body.termRequestEntity.ADBPercentage,


		     "CISA": req.body.termRequestEntity.CISA,
		     "LumpsumBSAProp": req.body.termRequestEntity.LumpsumBSAProp,
		     "ADBSA": req.body.termRequestEntity.ADBSA,
		     "TypeOfLife": req.body.termRequestEntity.TypeOfLife,
		     "ATPDSA": req.body.termRequestEntity.ATPDSA,
		     "HCBSA": req.body.termRequestEntity.HCBSA,
		     "WOP": req.body.termRequestEntity.WOP,
		     "PaymentOptn": req.body.termRequestEntity.PaymentOptn,


		     "MaritalStatus": req.body.termRequestEntity.MaritalStatus,
		     "PremiumPaymentOption": req.body.termRequestEntity.PremiumPaymentOption,
		     "ServiceTaxNotApplicable": req.body.termRequestEntity.ServiceTaxNotApplicable,
		     "CIBenefit": req.body.termRequestEntity.CIBenefit,
		     "ADHB": req.body.termRequestEntity.ADHB,

		     "InsurerId": req.body.termRequestEntity.InsurerId,
		     "SessionID": req.body.termRequestEntity.SessionID,
		     "Existing_ProductInsuranceMapping_Id": req.body.termRequestEntity.Existing_ProductInsuranceMapping_Id,
		     "ContactName": req.body.termRequestEntity.ContactName,
		     "ContactEmail": req.body.termRequestEntity.ContactEmail,
		     "ContactMobile": req.body.termRequestEntity.ContactMobile,
		     "SupportsAgentID": req.body.termRequestEntity.SupportsAgentID
		  }, function(response) {
		  		 if(response[0].CustomerReferenceID != 0){

		  		 	var SmartTermLifeParameter = [];
		  		 		SmartTermLifeParameter.push(req.body.termRequestId);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PolicyTerm);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.InsuredGender);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.Is_TabaccoUser);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.SumAssured);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.InsuredDOB);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PaymentModeValue);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PolicyCommencementDate);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.CityName);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.State);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PlanTaken);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.Frequency);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.DeathBenefitOption);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PPT);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.IncomeTerm);

		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.MonthlyIncome);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.LumpsumAmount);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.IncreaseIncomePercentage);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.IncreaseSAPercentage);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ADBPercentage);

		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.CISA);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.LumpsumBSAProp);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ADBSA);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.TypeOfLife);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ATPDSA);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.HCBSA);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.WOP);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PaymentOptn);

		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.MaritalStatus);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PremiumPaymentOption);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ServiceTaxNotApplicable);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.CIBenefit);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ADHB);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.InsurerId);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.SessionID);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.Existing_ProductInsuranceMapping_Id);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ContactName);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ContactEmail);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.ContactMobile);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.SupportsAgentID);
		  		 		SmartTermLifeParameter.push(response[0].CustomerReferenceID);

		  		 			con.execute_proc('call SmartTermLife(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',SmartTermLifeParameter,function(smartdata) {
					     		if(smartdata[0][0].SavedStatus == 0){
					     			var SmartTermLifeResponce = {"LifeTermRequestID":smartdata[0][0].lifetermrequestid,"Response":response };
					     			 base.send_response("Record saved successfully.",SmartTermLifeResponce,res);
					     		}else{
					     			 base.send_response("Record not saved.","",res);	
					     		}
					     	 });
		  		 	//  base.send_response("Success",response,res);
				}
		     	else{
		        	base.send_response("Failed to fetch", null,res);
		     	}
		  },11);
}
module.exports = {"SmartTermLifeParameter":SmartTermLifeParameter};