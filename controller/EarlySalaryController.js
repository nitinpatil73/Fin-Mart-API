var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var EarlySalary = function (req, res, next) {
	//	var brokerid = new Buffer((req.body.brokerid)).toString('base64');
	//	var response = { "{\"response\":\"SMS Sent to:9146609109\",\"status\":\"200\"}" }
		// console.log("*******************************");
		// console.log(brokerid);
		wrapper('/BankAPIService.svc/createEarlySalaryReq', 'POST', {
		    "FirstName" : req.body.FirstName,
		    "LastName" : req.body.LastName,
		    "phoneNumber" : req.body.phoneNumber,
		    "Age" : req.body.Age,
		    "email" : req.body.email,
		    "City" : req.body.City,
		    "RefferalCode" : req.body.RefferalCode,
		    "Employment" : req.body.Employment,
		    "MonthlySalary" : req.body.MonthlySalary,
		    "LoanAmount" : req.body.LoanAmount,

		    "empid":req.body.empid,
		    "brokerid":req.body.brokerid,
		    "source":req.body.source,
		    "CampaignName":req.body.CampaignName
		  }, function(response) {
		  	console.log("---------------------------------------");
		  	console.log(response);
		     if(response != null){
		     	var ExpressLoan = require('./ExpressLoan');
		     	SaveExpressKotakLoanParameter(req.body.FirstName + " " + req.body.LastName,
		     		req.body.phoneNumber,
		     		req.body.City,
		     		req.body.LoanAmount,
		     		req.body.BankId,
		     		req.body.LoanType,
		     		req.body.FBAID,
		     		req.body.ApplicationID,
		     		req, res, function(data){
		     	 	console.log(data);
		     	 });
		        base.send_response("success",response,res);    
		     }
		     else{
		        base.send_response("Failed to fetch", null,res);
		     }
		  },6);
	};


	var KotakPersonalLoan = function (req, res, next) {
	//	var kotakresponse = ("{\"?xml\":{\"@version\":\"1.0\",\"@encoding\":\"UTF-8\"},\"Response\":{\"@xmlns:ns0\":\"http://www.kotak.com/schemas/PersonalLoanResponse.xsd\",\"Status\":\"0\",\"ReferenceCode\":\"#PLT75JIPHT\",\"EligLnAmt\":\"0\",\"ROI\":\"0\",\"ErrorCode\":\"0\",\"ErrorInfo\":null,\"RequestIP\":\"10.10.3.144\"}}");
		 var PersonalLoan ={
				"IsExstCust": req.body.PersonalLoan.IsExstCust,
			    "ExstCustType": req.body.PersonalLoan.ExstCustType,
			    "CRN": req.body.PersonalLoan.CRN,
			    "PartyID": req.body.PersonalLoan.PartyID,
			    "FirstName": req.body.PersonalLoan.FirstName,
			    "MiddleName": req.body.PersonalLoan.MiddleName,
			    "LastName": req.body.PersonalLoan.LastName,
			    "Gender": req.body.PersonalLoan.Gender,
			    "Qualification": req.body.PersonalLoan.Qualification,
			    "DOB": req.body.PersonalLoan.DOB,
			    "Mobile": req.body.PersonalLoan.Mobile,
			    "Email": req.body.PersonalLoan.Email,
			    "Aadhar": req.body.PersonalLoan.Aadhar,
			    "PAN": req.body.PersonalLoan.PAN,
			    "EmpType": req.body.PersonalLoan.EmpType,
			    "Company_Cat": req.body.PersonalLoan.Company_Cat,
			    "Organization": req.body.PersonalLoan.Organization,
			    "CurCmpnyJoinDt": req.body.PersonalLoan.CurCmpnyJoinDt,
			    "TotWrkExp": req.body.PersonalLoan.TotWrkExp,
			    "OffAddress1": req.body.PersonalLoan.OffAddress1,
			    "OffAddress2": req.body.PersonalLoan.OffAddress2,
			    "OffAddress3": req.body.PersonalLoan.OffAddress3,
			    "OffCity": req.body.PersonalLoan.OffCity,
			    "OffPin": req.body.PersonalLoan.OffPin,
			    "OffPhone": req.body.PersonalLoan.OffPhone,
			    "PrefMailAdd": req.body.PersonalLoan.PrefMailAdd,
			    "ResAddress1": req.body.PersonalLoan.ResAddress1,
			    "ResAddress2": req.body.PersonalLoan.ResAddress2,
			    "ResAddress3": req.body.PersonalLoan.ResAddress3,
			    "ResCity": req.body.PersonalLoan.ResCity,
			    "ResPin": req.body.PersonalLoan.ResPin,
			    "ResType": req.body.PersonalLoan.ResType,
			    "CurResSince": req.body.PersonalLoan.CurResSince,
			    "ResPhNo": req.body.PersonalLoan.ResPhNo,
			    "same": req.body.PersonalLoan.same,
			    "PerAddress1": req.body.PersonalLoan.PerAddress1,
			    "PerAddress2": req.body.PersonalLoan.PerAddress2,
			    "PerAddress3": req.body.PersonalLoan.PerAddress3,
			    "PerCity": req.body.PersonalLoan.PerCity,
			    "PerPin": req.body.PersonalLoan.PerPin,
			    "PerResPhNo": req.body.PersonalLoan.PerResPhNo,
			    "NMI": req.body.PersonalLoan.NMI,
			    "EmiCurPay": req.body.PersonalLoan.EmiCurPay,
			    "LnAmt": req.body.PersonalLoan.LnAmt,
			    "TnrMths": req.body.PersonalLoan.TnrMths,
			    "IRR": req.body.PersonalLoan.IRR,
			    "ProcFee": req.body.PersonalLoan.ProcFee,
			    "IsCoApp": req.body.PersonalLoan.IsCoApp,
			    "CoAppReltn": req.body.PersonalLoan.CoAppReltn,
			    "CoAppDOB": req.body.PersonalLoan.CoAppDOB,
			    "CoAppEmpType": req.body.PersonalLoan.CoAppEmpType,
			    "CoAppOrg": req.body.PersonalLoan.CoAppOrg,
			    "CoAppNMI": req.body.PersonalLoan.CoAppNMI,
			    "CoAppEmiCurPay": req.body.PersonalLoan.CoAppEmiCurPay,
			    "Version": req.body.PersonalLoan.Version,
			    
			    "brokerid": req.body.PersonalLoan.brokerid,
			    "empid": req.body.PersonalLoan.empid,
			    "source": req.body.PersonalLoan.source,
			    "CampaignName": req.body.PersonalLoan.CampaignName
		 };

		wrapper('/BankAPIService.svc/createKotakPersonalLoanReq', 'POST', {
			 	"PersonalLoan":PersonalLoan
		  }, function(kotakresponse) {
			 js=JSON.parse(kotakresponse);
			 if(js.Response.Status == 3)
			 {
			    SaveExpressKotakLoanParameter(req.body.PersonalLoan.FirstName + " " + req.body.PersonalLoan.LastName,
			    req.body.PersonalLoan.Mobile,
			    req.body.PersonalLoan.ResCity,
			    req.body.PersonalLoan.LnAmt,
			    req.body.PersonalLoan.BankId,
			    req.body.PersonalLoan.LoanType,
			    req.body.PersonalLoan.FBAID,
			    js.Response.ReferenceCode,
			    req, res, function(savedata){
			     	next(savedata);
			    });

			   var successresponse = {"ReferenceCode":js.Response.ReferenceCode};
			    base.send_response("Record saved successfully.",successresponse,res);    
			}
			 else{
			        base.send_response("Please change PAN or Mobile No.",null,res);
			}
		  },6);
		};


	var SaveExpressKotakLoanParameter = function(name,mobile,city,loanamount,bankid,loantype,fbaid,applicationid,req, res, next) {
	var   SaveLoanParameter = [];
		  SaveLoanParameter.push(name);
		  SaveLoanParameter.push(mobile);
		  SaveLoanParameter.push(city);
		  SaveLoanParameter.push(loanamount);
		  SaveLoanParameter.push(bankid);
		  SaveLoanParameter.push(loantype);
		  SaveLoanParameter.push(fbaid);
		  SaveLoanParameter.push(applicationid);
    	  con.execute_proc('call SaveExpressLoanRequest(?,?,?,?,?,?,?,?)',SaveLoanParameter,function(loansavedata) {
      	  next(loansavedata);
    });
}

		var HDFCPLParameter = function (req, res, next) {
		//	var HDFCResponse = ("{\"Status\":\"0\",\"Lead_Id\":\"796295\"}");
		// var brokerid = new Buffer(req.body.brokerid).toString('base64');
		// console.log("----------------------------------------------------------");
		// console.log(brokerid);
			wrapper('/BankAPIService.svc/createHDFCPLReq', 'POST', {
			 	"branch_location": req.body.branch_location,
						  "branch_code": req.body.branch_code,
						  "customer_name": req.body.customer_name,
						  "dob": req.body.dob,
						  "qualification": req.body.qualification,
						  "loanamount": req.body.loanamount,
						  "pancard": req.body.pancard,
						  "company_name": req.body.company_name,
						  "profile": req.body.profile,
						  "mobile_num": req.body.mobile_num,
						  "alternate_num": req.body.alternate_num,
						  "landline": req.body.landline,
						  "alt_landline": req.body.alt_landline,
						  "net_income": req.body.net_income,
						  "pincode": req.body.pincode,
						  "emi": req.body.emi,
						  "yrs_of_emp": req.body.yrs_of_emp,
						  "email": req.body.email,
						  "current_add": req.body.current_add,
						  "same": req.body.same,
						  "per_add": req.body.per_add,

						  "brokerid":req.body.brokerid,
						  "empid": req.body.empid,
						  "source": req.body.source,
						  "CampaignName": req.body.CampaignName
		  }, function(HDFCResponse) {
		 js=JSON.parse(HDFCResponse);
		 if(js.Status == 1){
		    	  	SaveExpressKotakLoanParameter(req.body.customer_name,
		     		req.body.mobile_num,
		     		req.body.City,
		     		req.body.loanamount,
		     		req.body.BankId,
		     		req.body.LoanType,
		     		req.body.FBAID,
		     		js.Lead_Id,
		     		req, res, function(data){
		     	 	console.log(data);
		     	 });
		    	  var successresponse = {"Lead_Id":js.Lead_Id};
		        base.send_response("Record saved successfully.",successresponse,res);    
		     }
		     else{
		        base.send_response("Please change PAN or Mobile No.", null,res);
		     }
		   },6);
		};

		var RupeeBossParameter = function (req, res, next) {
		//	var RBLData = ("{\"Status\":1,\"ReferenceCode\":\"#PLQER293F\",\"EligibilityDesc\":\"0\",\"Errorcode\":0,\"Errorinfo\":\"\",\"RequestIP\":\"49.50.95.141\"}");
			var PersonalLoan = {
				"FirstName": req.body.FirstName,
			    "MiddleName": req.body.MiddleName,
			    "LastName": req.body.LastName,
			    "Gender": req.body.Gender,
			    "ResAddress1": req.body.ResAddress1,
			    "ResAddress2": req.body.ResAddress2,
			    "ResLand": req.body.ResLand,
			    "DOB": req.body.DOB,
			    "ResType": req.body.ResType,
			    "CurResSince": req.body.CurResSince,
			    "ResPIN": req.body.ResPIN,
			    "Mobile": req.body.Mobile,
			    "Email": req.body.Email,
			    "EmpType": req.body.EmpType,
			    "LnAmt": req.body.LnAmt,
			    "TnrMths": req.body.TnrMths,
			    "IRR": req.body.IRR,
			    "ProcFee": req.body.ProcFee,
			    "NMI": req.body.NMI,
			    "EmiCurPay": req.body.EmiCurPay,
			    "ResCity": req.body.ResCity,
			    "CompanyName": req.body.CompanyName,
			    "CurCmpnyJoinDt": req.body.CurCmpnyJoinDt,
			    "TotWrkExp": req.body.TotWrkExp,
			    "OffAddress1": req.body.OffAddress1,
			    "OffAddress2": req.body.OffAddress2,
			    "OrgCategory": req.body.OrgCategory,
			    "OffCity": req.body.OffCity,
			    "OffPIN": req.body.OffPIN,
			    "OffPhone": req.body.OffPhone,
			    "PAN": req.body.PAN,
			    "Qualification": req.body.Qualification,
			    "check": req.body.check,

			    "brokerid": req.body.brokerid,
			    "empid": req.body.empid,
			    "source": req.body.source,
			    "CampaignName": req.body.CampaignName
			}
			wrapper('/BankAPIService.svc/createRBLPersonalLoanReq', 'POST', {
			 	"PersonalLoan":PersonalLoan
		  }, function(RBLData) {
		 js=JSON.parse(RBLData);
		 if(js.Status == 4){
		 	  js=JSON.parse(RBLData);
		    	  	SaveExpressKotakLoanParameter(req.body.FirstName + " " + req.body.LastName,
		     		req.body.Mobile,
		     		req.body.ResCity,
		     		req.body.LnAmt,
		     		req.body.BankId,
		     		req.body.LoanType,
		     		req.body.FBAID,
		     		js.ReferenceCode,
		     		req, res, function(data){
		     	 });
		    	  var successresponse = { "ReferenceCode":js.ReferenceCode }
		        base.send_response("Record saved successfully.",successresponse,res);    
		     }
		     else{
		        base.send_response("Please change PAN or Mobile No.", null,res);
		     }
		   },6);
		};


module.exports = {"EarlySalary":EarlySalary,"KotakPersonalLoan":KotakPersonalLoan,"SaveExpressKotakLoanParameter":SaveExpressKotakLoanParameter,"HDFCPLParameter":HDFCPLParameter,"RupeeBossParameter":RupeeBossParameter};