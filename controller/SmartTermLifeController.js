var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');


var SmartTermLifeParameter = function(req, res, next) {
	var pincodeparameter = [];
	pincodeparameter.push(req.body.termRequestEntity.pincode);
	if(pincodeparameter != '' && pincodeparameter != null)
	{
		con.execute_proc('call smart_term_get_city_state(?)',pincodeparameter,function(pincoderesponse) {
	    if(pincoderesponse!=null){
			var apiname = "/api/SmartTermLife";
		   if(process.env.NODE_ENV == 'development'){
		        apiname = "/quotes/api/SmartTermLife";		     
		    }
			wrapper(apiname, 'POST', {
		   	 "PolicyTerm": req.body.termRequestEntity.PolicyTerm,
		     "InsuredGender": req.body.termRequestEntity.InsuredGender,
		     "Is_TabaccoUser": req.body.termRequestEntity.Is_TabaccoUser,
		     "SumAssured": req.body.termRequestEntity.SumAssured,
		     "InsuredDOB": req.body.termRequestEntity.InsuredDOB,
		     "PaymentModeValue": req.body.termRequestEntity.PaymentModeValue,
		     "PolicyCommencementDate": req.body.termRequestEntity.PolicyCommencementDate,
		     "CityName": pincoderesponse[0][0].cityname,
		     "State": pincoderesponse[0][0].state_name,
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
		    
		     "FBAID": req.body.termRequestEntity.FBAID,

		     "ContactName": req.body.termRequestEntity.ContactName,
		     "ContactEmail": req.body.termRequestEntity.ContactEmail,
		     "ContactMobile": req.body.termRequestEntity.ContactMobile,
		     "SupportsAgentID": req.body.termRequestEntity.SupportsAgentID,


		     "LumpsumPercentage": req.body.termRequestEntity.LumpsumPercentage,
			"created_date": req.body.termRequestEntity.created_date,
			"crn": req.body.termRequestEntity.crn,
			"pincode": req.body.termRequestEntity.pincode,
		  }, function(response) {
		//  	console.log("---------------------------------Response------------------------------------");
		 // 	console.log(response);
				  if(response != null && response != '')
				  {
		  		 	var SmartTermLifeParameter = [];
		  		 		SmartTermLifeParameter.push(req.body.termRequestId);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PolicyTerm);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.InsuredGender);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.Is_TabaccoUser);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.SumAssured);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.InsuredDOB);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PaymentModeValue);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.PolicyCommencementDate);
		  		 		SmartTermLifeParameter.push(pincoderesponse[0][0].cityname);
		  		 		SmartTermLifeParameter.push(pincoderesponse[0][0].state_name);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.pincode);
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
		  		 		SmartTermLifeParameter.push(req.body.fba_id);
		  		 		SmartTermLifeParameter.push(req.body.termRequestEntity.LumpsumPercentage);
		  		 			con.execute_proc('call SmartTermLife(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',SmartTermLifeParameter,function(smartdata) {
					      		if(smartdata[0][0].SavedStatus == 0){
					     			var SmartTermLifeResponce = {"LifeTermRequestID":smartdata[0][0].lifetermrequestid,"Response":response};
					     			base.send_response("Record saved successfully.",SmartTermLifeResponce,res);
					     		}else{
					     			 base.send_response("Record not saved.","",res);	
					     		}
					     	 });
				}
		     	else{
		     		base.send_response("Kindly try after sometime..",null,res);	
		     	}
		  },11);
		}else{
		    base.send_response("failure",null,res);
		}
	});
	}else{
		base.send_response("Please enter pincode",null,res);
	}
}

var GetSmartTermLife = function(req, res, next) {
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
		con.execute_proc('call GetSmartTermLife(?,?,?,?)',getsmartterm,function(getsmartdata) {
		if(getsmartdata != null){
			var quoteresponse = [];
    		var applicationquote = [];
    		for (var i = 0; i < getsmartdata[0].length; i++) {
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
		            "PBStatusDate": getsmartdata[0][i].PBStatusDate,
		            "ApplNumb": getsmartdata[0][i].ApplNumb,
		            "ApplDate": getsmartdata[0][i].ApplDate

    			};
    			quoteresponse.push({"termRequestEntity":response_quote,"termRequestId": getsmartdata[0][i].lifetermrequestid,"NetPremium": getsmartdata[0][i].NetPremium,"statusProgress": 0,"insImage":getsmartdata[0][i].insImage,"fba_id": getsmartdata[0][i].fba_id});
    		}

    			for (var i = 0; i < getsmartdata[1].length; i++) {
    			var response_appli ={
			            "PolicyTerm": getsmartdata[1][i].PolicyTerm,
			            "InsuredGender": getsmartdata[1][i].InsuredGender,
			            "Is_TabaccoUser": getsmartdata[1][i].Is_TabaccoUser,
			            "SumAssured": getsmartdata[1][i].SumAssured,
			            "InsuredDOB": getsmartdata[1][i].InsuredDOB,
			            "PaymentModeValue": getsmartdata[1][i].PaymentModeValue,
			            "PolicyCommencementDate": getsmartdata[1][i].PolicyCommencementDate,
			            "CityName": getsmartdata[1][i].CityName,
			            "State": getsmartdata[1][i].State,
			            "pincode": getsmartdata[1][i].pincode,
			            "PlanTaken": getsmartdata[1][i].PlanTaken,
			            "Frequency": getsmartdata[1][i].Frequency,
			            "DeathBenefitOption": getsmartdata[1][i].DeathBenefitOption,
			            "PPT": getsmartdata[1][i].PPT,
			            "IncomeTerm": getsmartdata[1][i].IncomeTerm,
			            "MonthlyIncome": getsmartdata[1][i].MonthlyIncome,
			            "LumpsumAmount": getsmartdata[1][i].LumpsumAmount,

			            "LumpsumPercentage": getsmartdata[1][i].LumpsumPercentage,

			            "IncreaseIncomePercentage": getsmartdata[1][i].IncreaseIncomePercentage,
			            "IncreaseSAPercentage": getsmartdata[1][i].IncreaseSAPercentage,
			            "ADBPercentage": getsmartdata[1][i].ADBPercentage,
			            "CISA": getsmartdata[1][i].CISA,
			            "LumpsumBSAProp": getsmartdata[1][i].LumpsumBSAProp,
			            "ADBSA": getsmartdata[1][i].ADBSA,
			            "TypeOfLife": getsmartdata[1][i].TypeOfLife,
			            "ATPDSA": getsmartdata[1][i].ATPDSA,
			            "HCBSA": getsmartdata[1][i].HCBSA,
			            "WOP": getsmartdata[1][i].WOP,
			            "PaymentOptn": getsmartdata[1][i].PaymentOptn,
			            "MaritalStatus": getsmartdata[1][i].MaritalStatus,
			            "PremiumPaymentOption": getsmartdata[1][i].PremiumPaymentOption,
			            "ServiceTaxNotApplicable": getsmartdata[1][i].ServiceTaxNotApplicable,
			            "CIBenefit": getsmartdata[1][i].CIBenefit,
			            "ADHB": getsmartdata[1][i].ADHB,
			            "InsurerId": getsmartdata[1][i].InsurerId,
			            "SessionID": getsmartdata[1][i].SessionID,
			            "Existing_ProductInsuranceMapping_Id": getsmartdata[1][i].Existing_ProductInsuranceMapping_Id,
			            "FBAID": getsmartdata[1][i].fba_id,
			            "ContactName": getsmartdata[1][i].ContactName,
			            "ContactEmail": getsmartdata[1][i].ContactEmail,
			            "ContactMobile": getsmartdata[1][i].ContactMobile,
			            "SupportsAgentID": getsmartdata[1][i].SupportsAgentID,
			            "crn": getsmartdata[1][i].crn,
			            "Quote_Application_Status": getsmartdata[1][i].Quote_Application_Status,
			            "conversion_date": getsmartdata[1][i].conversion_date,
			            "created_date": getsmartdata[1][i].created_date,
			            "updated_date": getsmartdata[1][i].updated_date,
			            "isActive": getsmartdata[1][i].isActive,
			            "PBStatus": getsmartdata[1][i].PBStatus,
			            "PBStatusDate": getsmartdata[1][i].PBStatusDate,
			            "ApplNumb": getsmartdata[1][i].ApplNumb,
			            "ApplDate": getsmartdata[1][i].ApplDate

    			};
    			applicationquote.push({"termRequestEntity":response_appli,"termRequestId": getsmartdata[1][i].lifetermrequestid,"NetPremium": getsmartdata[1][i].NetPremium,"statusProgress": 0,"insImage":getsmartdata[1][i].insImage,"fba_id": getsmartdata[1][i].fba_id});
    		}

    		var getsmart = {"quote":quoteresponse,"application":applicationquote};
			base.send_response("Success",getsmart,res);
		}else{
			base.send_response("Failure","",res);
		}

	});
}
else if(req.body.type == 1)
{
	con.execute_proc('call GetSmartTermLife(?,?,?,?)',getsmartterm,function(getsmartdata) {
		if(getsmartdata != null){
			var quoteresponse = [];
    		var applicationquote = [];
    		for (var i = 0; i < getsmartdata[0].length; i++) {
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
		            "PBStatusDate": getsmartdata[0][i].PBStatusDate,
		            "ApplNumb": getsmartdata[0][i].ApplNumb,
		            "ApplDate": getsmartdata[0][i].ApplDate

    			};
    			quoteresponse.push({"termRequestEntity":response_quote,"termRequestId": getsmartdata[0][i].lifetermrequestid,"NetPremium": getsmartdata[0][i].NetPremium,"statusProgress": 0,"insImage":getsmartdata[0][i].insImage,"fba_id": getsmartdata[0][i].fba_id});
    		}
    		var getsmart = {"quote":quoteresponse,"application":[]};
			base.send_response("Success",getsmart,res);
			}else{
				base.send_response("Failure","",res);
			}
		});
}
else if(req.body.type == 2)
{
		con.execute_proc('call GetSmartTermLife(?,?,?,?)',getsmartterm,function(getsmartdata) {
		if(getsmartdata != null){
			var quoteresponse = [];
    		var applicationquote = [];
				for (var i = 0; i < getsmartdata[0].length; i++) {
    			var response_appli ={
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
			            "PBStatusDate": getsmartdata[0][i].PBStatusDate,
			            "ApplNumb": getsmartdata[0][i].ApplNumb,
			            "ApplDate": getsmartdata[0][i].ApplDate

    			};
    			applicationquote.push({"termRequestEntity":response_appli,"termRequestId": getsmartdata[0][i].lifetermrequestid,"NetPremium": getsmartdata[0][i].NetPremium,"statusProgress": 0,"insImage":getsmartdata[0][i].insImage,"fba_id": getsmartdata[0][i].fba_id});
    		}
    	//	console.log("--------------------2------------------------");
    	//	console.log(applicationquote);
    		var getsmart = {"quote":[],"application":applicationquote};
			base.send_response("Success",getsmart,res);
		}else{
			base.send_response("Failure","",res);
		}

	});
}
else{
	base.send_response("Failure Type not match","",res);
}
}


var DeleteSmartTerm = function(req, res, next) {
  var deleteparameter = [];
      deleteparameter.push(req.body.termRequestId); 
      con.execute_proc('call DeleteSmartTerm(?)',deleteparameter,function(deldata) {
      if(deldata[0][0].SavedStatus=="0"){
        base.send_response("Record deleted successfully.", deldata[0],res);
      }
      else{
        base.send_response("Failure",null,res);
      }
  });
};

var setQuoteToApplicationSmartTerm = function(req, res, next) {
  var smarttermparameter = [];
      smarttermparameter.push(req.body.termRequestId); 
  	  smarttermparameter.push(req.body.InsurerId); 
  	  smarttermparameter.push(req.body.fba_id); 
  	  smarttermparameter.push(req.body.NetPremium);
 
  con.execute_proc('call setQuoteToApplicationSmartTerm(?,?,?,?)',smarttermparameter,function(smarttermdata) {
      if(smarttermdata[0][0].SavedStatus=="0"){
        base.send_response("Record updated successfully.", smarttermdata[0],res);
      }
      else{
        base.send_response("Failure",null,res);
      }
  });
};


module.exports = {"SmartTermLifeParameter":SmartTermLifeParameter,"GetSmartTermLife":GetSmartTermLife,"DeleteSmartTerm":DeleteSmartTerm,"setQuoteToApplicationSmartTerm":setQuoteToApplicationSmartTerm};