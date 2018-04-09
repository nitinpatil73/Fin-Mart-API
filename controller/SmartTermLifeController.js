var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var SmartTermLifeParameter = function(req, res, next) {

		wrapper('/quotes/api/SmartTermLife', 'POST', {
		   	"PolicyTerm": req.body.PolicyTerm,
		     "InsuredGender": req.body.InsuredGender,
		     "Is_TabaccoUser": req.body.Is_TabaccoUser,
		     "SumAssured": req.body.SumAssured,
		     "InsuredDOB": req.body.InsuredDOB,
		     "PaymentModeValue": req.body.PaymentModeValue,
		     "PolicyCommencementDate": req.body.PolicyCommencementDate,
		     "CityName": req.body.CityName,
		     "State": req.body.State,
		     "PlanTaken": req.body.PlanTaken,
		     "Frequency": req.body.Frequency,
		     "DeathBenefitOption": req.body.DeathBenefitOption,
		     "PPT": req.body.PPT,
		     "IncomeTerm": req.body.IncomeTerm,

		     "MonthlyIncome": req.body.MonthlyIncome,
		     "LumpsumAmount": req.body.LumpsumAmount,
		     "IncreaseIncomePercentage": req.body.IncreaseIncomePercentage,
		     "IncreaseSAPercentage": req.body.IncreaseSAPercentage,
		     "ADBPercentage": req.body.ADBPercentage,


		     "CISA": req.body.CISA,
		     "LumpsumBSAProp": req.body.LumpsumBSAProp,
		     "ADBSA": req.body.ADBSA,
		     "TypeOfLife": req.body.TypeOfLife,
		     "ATPDSA": req.body.ATPDSA,
		     "HCBSA": req.body.HCBSA,
		     "WOP": req.body.WOP,
		     "PaymentOptn": req.body.PaymentOptn,


		     "MaritalStatus": req.body.MaritalStatus,
		     "PremiumPaymentOption": req.body.PremiumPaymentOption,
		     "ServiceTaxNotApplicable": req.body.ServiceTaxNotApplicable,
		     "CIBenefit": req.body.CIBenefit,
		     "ADHB": req.body.ADHB,

		     "InsurerId": req.body.InsurerId,
		     "SessionID": req.body.SessionID,
		     "Existing_ProductInsuranceMapping_Id": req.body.Existing_ProductInsuranceMapping_Id,
		     "ContactName": req.body.ContactName,
		     "ContactEmail": req.body.ContactEmail,
		     "ContactMobile": req.body.ContactMobile,
		     "SupportsAgentID": req.body.SupportsAgentID
		  }, function(response) {
		  	console.log("-------------------------------------");
		  	console.log(response);
		  		 if(response != null){
		  		 	  base.send_response("Success",response,res);
				}
		     	else{
		        	base.send_response("Failed to fetch", null,res);
		     	}
		  },11);
}
module.exports = {"SmartTermLifeParameter":SmartTermLifeParameter};