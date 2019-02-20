var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');


var SmartTermLifeOfflineQuoteParameter = function(req, res, next) {
	var pincodeparameter = [];
	pincodeparameter.push(req.body.termRequestEntity.pincode);
	if(pincodeparameter != '' && pincodeparameter != null)
	{
		con.execute_proc('call smart_term_get_city_state(?)',pincodeparameter,function(pincoderesponse) {
	    	if(pincoderesponse!=null){
				var SmartTermLifeOfflineQuoteParameter = [];
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestId);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PolicyTerm);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.InsuredGender);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.Is_TabaccoUser);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.SumAssured);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.InsuredDOB);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PaymentModeValue);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PolicyCommencementDate);
		  		 	SmartTermLifeOfflineQuoteParameter.push(pincoderesponse[0][0].cityname);
		  		 	SmartTermLifeOfflineQuoteParameter.push(pincoderesponse[0][0].state_name);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.pincode);
		  		 	//SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PlanTaken);
		  		 	SmartTermLifeOfflineQuoteParameter.push(null);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.Frequency);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.DeathBenefitOption);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PPT);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.IncomeTerm);

		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.MonthlyIncome);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.LumpsumAmount);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.IncreaseIncomePercentage);
		  		 	//SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.IncreaseSAPercentage);
		  		 	SmartTermLifeOfflineQuoteParameter.push(null);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ADBPercentage);

		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.CISA);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.LumpsumBSAProp);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ADBSA);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.TypeOfLife);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ATPDSA);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.HCBSA);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.WOP);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PaymentOptn);

		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.MaritalStatus);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.PremiumPaymentOption);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ServiceTaxNotApplicable);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.CIBenefit);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ADHB);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.InsurerId);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.SessionID);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.Existing_ProductInsuranceMapping_Id);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ContactName);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ContactEmail);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.ContactMobile);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.SupportsAgentID);
		  		 	SmartTermLifeOfflineQuoteParameter.push(0);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.fba_id);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.LumpsumPercentage);
		  		 	SmartTermLifeOfflineQuoteParameter.push(req.body.termRequestEntity.comment);
		  		 	con.execute_proc('call SmartTermLifeOfflineQuote(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',SmartTermLifeOfflineQuoteParameter,function(smartdata) {
					if(smartdata[0][0].SavedStatus == 0){
					     base.send_response("Record saved successfully.",smartdata[0],res);
				    }else{
					     base.send_response("Record not saved.","",res);	
					}
			    });
			}else{
		    	base.send_response("failure",null,res);
			}
		});
	}else{
		base.send_response("Please enter pincode",null,res);
	}
};

var GetSmartTermLifeOfflineQuote = function(req, res, next) {
	var getsmartterm = [];
	if(req.body.InsurerId){
		getsmartterm.push(req.body.InsurerId);
	}
	else
	{
		getsmartterm.push(null);
	}
	if(req.body.fba_id){
		getsmartterm.push(req.body.fba_id);
	}
	else
	{
		getsmartterm.push(null);
	}
	if(req.body.count){
		getsmartterm.push(req.body.count);
	}
	else
	{
		getsmartterm.push(0);
		req.body.count=0;
	}
	if(req.body.type){
		getsmartterm.push(req.body.type);
	}
	else
	{
		getsmartterm.push(0);
		req.body.type=0;
	}
	if(req.body.type == 0)
	{
		con.execute_proc('call GetSmartTermLifeOfflineQuote(?,?,?,?)',getsmartterm,function(getsmartdata) {
			if(getsmartdata != null){
				var quoteresponse = [];
	    		var applicationquote = [];
	    		for (var i = 0; i < getsmartdata[0].length; i++) {


	    			   var quote = []; 

			        for (var j = 0; j < getsmartdata[1].length; j++) {  
			          //console.log(data[1][j].TranId);       
			          if(getsmartdata[1][j].TranId == getsmartdata[0][i].TransId){
			             // console.log(data[1][j].TransId);
			             // console.log(data[0][i].TranId);
			              quote.push(getsmartdata[1][j]);
			            }
         			}


	    		var response_quote ={
			            "PolicyTerm": getsmartdata[0][i].PolicyTerm,
			            "InsuredGender": getsmartdata[0][i].InsuredGender,
			            "Is_TabaccoUser": getsmartdata[0][i].Is_TabaccoUser,
			            "SumAssured": getsmartdata[0][i].SumAssured,
			            "InsuredDOB": getsmartdata[0][i].InsuredDOB,
			            "PaymentModeValue": getsmartdata[0][i].PaymentModeValue,
			            "PolicyCommencementDate": getsmartdata[0][i].PolicyCommencementDate,
			            "CityName": getsmartdata[0][i].CityName,
			            "State": getsmartdata[0][i].State,
			            "pincode": getsmartdata[0][i].pincode,
			            "PlanTaken": getsmartdata[0][i].PlanTaken,
			            "Frequency": getsmartdata[0][i].Frequency,
			            "DeathBenefitOption": getsmartdata[0][i].DeathBenefitOption,
			            "PPT": getsmartdata[0][i].PPT,
			            "IncomeTerm": getsmartdata[0][i].IncomeTerm,
			            "MonthlyIncome": getsmartdata[0][i].MonthlyIncome,
			            "LumpsumAmount": getsmartdata[0][i].LumpsumAmount,

			            "LumpsumPercentage": getsmartdata[0][i].LumpsumPercentage,

			            "IncreaseIncomePercentage": getsmartdata[0][i].IncreaseIncomePercentage,
			            "IncreaseSAPercentage": getsmartdata[0][i].IncreaseSAPercentage,
			            "ADBPercentage": getsmartdata[0][i].ADBPercentage,
			            "CISA": getsmartdata[0][i].CISA,
			            "LumpsumBSAProp": getsmartdata[0][i].LumpsumBSAProp,
			            "ADBSA": getsmartdata[0][i].ADBSA,
			            "TypeOfLife": getsmartdata[0][i].TypeOfLife,
			            "ATPDSA": getsmartdata[0][i].ATPDSA,
			            "HCBSA": getsmartdata[0][i].HCBSA,
			            "WOP": getsmartdata[0][i].WOP,
			            "PaymentOptn": getsmartdata[0][i].PaymentOptn,
			            "MaritalStatus": getsmartdata[0][i].MaritalStatus,
			            "PremiumPaymentOption": getsmartdata[0][i].PremiumPaymentOption,
			            "ServiceTaxNotApplicable": getsmartdata[0][i].ServiceTaxNotApplicable,
			            "CIBenefit": getsmartdata[0][i].CIBenefit,
			            "ADHB": getsmartdata[0][i].ADHB,
			            "InsurerId": getsmartdata[0][i].InsurerId,
			            "SessionID": getsmartdata[0][i].SessionID,
			            "Existing_ProductInsuranceMapping_Id": getsmartdata[0][i].Existing_ProductInsuranceMapping_Id,
			            "FBAID": getsmartdata[0][i].fba_id,
			            "ContactName": getsmartdata[0][i].ContactName,
			            "ContactEmail": getsmartdata[0][i].ContactEmail,
			            "ContactMobile": getsmartdata[0][i].ContactMobile,
			            "SupportsAgentID": getsmartdata[0][i].SupportsAgentID,
			            "crn": getsmartdata[0][i].crn,
			            "Quote_Application_Status": getsmartdata[0][i].Quote_Application_Status,
			            "conversion_date": getsmartdata[0][i].conversion_date,
			            "created_date": getsmartdata[0][i].created_date,
			            "updated_date": getsmartdata[0][i].updated_date,
			            "isActive": getsmartdata[0][i].isActive,
			            "PBStatus": getsmartdata[0][i].PBStatus,
			            "PBStatusDesc": getsmartdata[0][i].PBStatusDesc,
			            "PBStatusDate": getsmartdata[0][i].PBStatusDate,
			            "ApplNumb": getsmartdata[0][i].ApplNumb,
			            "ApplDate": getsmartdata[0][i].ApplDate,
			            "comment": getsmartdata[0][i].comment,
			            "TransId": getsmartdata[0][i].TransId
			           

	    			};
	    			quoteresponse.push({"termRequestEntity":response_quote,"termRequestId": getsmartdata[0][i].lifetermofflinequoteid,"NetPremium": getsmartdata[0][i].NetPremium,"statusProgress": 0,"insImage":getsmartdata[0][i].insImage,"fba_id": getsmartdata[0][i].fba_id});
	    		}
	    		var getsmart = {"quote":quoteresponse,"application":[]};
				base.send_response("Success",getsmart,res);
			}else{
				base.send_response("Failure","",res);
			}
		});
	}
}

module.exports = {"SmartTermLifeOfflineQuoteParameter":SmartTermLifeOfflineQuoteParameter,"GetSmartTermLifeOfflineQuote":GetSmartTermLifeOfflineQuote};