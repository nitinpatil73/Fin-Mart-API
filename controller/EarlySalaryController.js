var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');


var BrokerIdEncodeParameter = function(req, res, next) {
		wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
		},function(Encoderesponse) {
			if(Encoderesponse != null && Encoderesponse != ''){
				base.send_response("Success",Encoderesponse,res);
			}else{
				base.send_response("Broker Id does not exist","",res);
			}

	},6);
};

var EarlySalary = function (req, res, next) {
		wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
		},function(Encoderesponse) {
			if(Encoderesponse != null && Encoderesponse != ''){
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

				    "empid":"MAA=",
				    "brokerid":Encoderesponse,
				    "source":"MAA=",
				    "CampaignName":"Finmart App"
				  }, function(response) {
				  	console.log("------------------Early salary response---------------------");
				  	console.log(response);
					 js=JSON.parse(response);
				     if(js.status == 200){
				     	//var ExpressLoan = require('./ExpressLoan');
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
				        base.send_response("Record saved successfully.",response,res);    
				     }
				     else{
				        base.send_response("Please change mobile no.", null,res);
				     }
				  },6);
			}else{
				base.send_response("Broker Id does not exist","",res);
			}

		},6);
	
	};


	var KotakPersonalLoan = function (req, res, next) {
	//	var kotakresponse = ("{\"?xml\":{\"@version\":\"1.0\",\"@encoding\":\"UTF-8\"},\"Response\":{\"@xmlns:ns0\":\"http://www.kotak.com/schemas/PersonalLoanResponse.xsd\",\"Status\":\"0\",\"ReferenceCode\":\"#PLT75JIPHT\",\"EligLnAmt\":\"0\",\"ROI\":\"0\",\"ErrorCode\":\"0\",\"ErrorInfo\":null,\"RequestIP\":\"10.10.3.144\"}}");
		wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
		},function(Encoderesponse) {
			if(Encoderesponse != null && Encoderesponse != ''){
				var PersonalLoan ={
					"IsExstCust": req.body.IsExstCust,
				    "ExstCustType": req.body.ExstCustType,
				    "CRN": req.body.CRN,
				    "PartyID": req.body.PartyID,
				    "FirstName": req.body.FirstName,
				    "MiddleName": req.body.MiddleName,
				    "LastName": req.body.LastName,
				    "Gender": req.body.Gender,
				    "Qualification": req.body.Qualification,
				    "DOB": req.body.DOB,
				    "Mobile": req.body.Mobile,
				    "Email": req.body.Email,
				    "Aadhar": req.body.Aadhar,
				    "PAN": req.body.PAN,
				    "EmpType": req.body.EmpType,
				    "Company_Cat": req.body.Company_Cat,
				    "Organization": req.body.Organization,
				    "CurCmpnyJoinDt": req.body.CurCmpnyJoinDt,
				    "TotWrkExp": req.body.TotWrkExp,
				    "OffAddress1": req.body.OffAddress1,
				    "OffAddress2": req.body.OffAddress2,
				    "OffAddress3": req.body.OffAddress3,
				    "OffCity": req.body.OffCity,
				    "OffPin": req.body.OffPin,
				    "OffPhone": req.body.OffPhone,
				    "PrefMailAdd": req.body.PrefMailAdd,
				    "ResAddress1": req.body.ResAddress1,
				    "ResAddress2": req.body.ResAddress2,
				    "ResAddress3": req.body.ResAddress3,
				    "ResCity": req.body.ResCity,
				    "ResPin": req.body.ResPin,
				    "ResType": req.body.ResType,
				    "CurResSince": req.body.CurResSince,
				    "ResPhNo": req.body.ResPhNo,
				    "same": req.body.same,
				    "PerAddress1": req.body.PerAddress1,
				    "PerAddress2": req.body.PerAddress2,
				    "PerAddress3": req.body.PerAddress3,
				    "PerCity": req.body.PerCity,
				    "PerPin": req.body.PerPin,
				    "PerResPhNo": req.body.PerResPhNo,
				    "NMI": req.body.NMI,
				    "EmiCurPay": req.body.EmiCurPay,
				    "LnAmt": req.body.LnAmt,
				    "TnrMths": req.body.TnrMths,
				    "IRR": req.body.IRR,
				    "ProcFee": req.body.ProcFee,
				    "IsCoApp": req.body.IsCoApp,
				    "CoAppReltn": req.body.CoAppReltn,
				    "CoAppDOB": req.body.CoAppDOB,
				    "CoAppEmpType": req.body.CoAppEmpType,
				    "CoAppOrg": req.body.CoAppOrg,
				    "CoAppNMI": req.body.CoAppNMI,
				    "CoAppEmiCurPay": req.body.CoAppEmiCurPay,
				    "Version": req.body.Version,

				    "brokerid": Encoderesponse,
				    "empid": req.body.empid,
				    "source": req.body.source,
				    "CampaignName": req.body.CampaignName
				 };

				wrapper('/BankAPIService.svc/createKotakPersonalLoanReq', 'POST', {
					 	"PersonalLoan":PersonalLoan
				  }, function(kotakresponse) {

				  	console.log("************************************");
				  	console.log(kotakresponse);
					 js=JSON.parse(kotakresponse);
					 if(js.Response.Status == 2)
					 {
					    SaveExpressKotakLoanParameter(req.body.FirstName + " " + req.body.LastName,
					    req.body.Mobile,
					    req.body.ResCity,
					    req.body.LnAmt,
					    req.body.BankId,
					    req.body.LoanType,
					    req.body.FBAID,
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
			}else{
				base.send_response("Broker Id does not exist","",res);
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
			wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
				},function(Encoderesponse) {
					if(Encoderesponse != null && Encoderesponse != ''){
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

						  "brokerid":Encoderesponse,
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
					}else{
						base.send_response("Broker Id does not exist","",res);
					}

			},6);
			
		};

		var RupeeBossParameter = function (req, res, next) {
		//	var RBLData = ("{\"Status\":1,\"ReferenceCode\":\"#PLQER293F\",\"EligibilityDesc\":\"0\",\"Errorcode\":0,\"Errorinfo\":\"\",\"RequestIP\":\"49.50.95.141\"}");
		wrapper('/BankAPIService.svc/getEncryptString?InputData='+req.body.brokerid, 'GET',{
			},function(Encoderesponse) {
				console.log("********************************************");
				console.log(Encoderesponse);
				if(Encoderesponse != null && Encoderesponse != ''){
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

			    "brokerid": Encoderesponse,
			    "empid": req.body.empid,
			    "source": req.body.source,
			    "CampaignName": req.body.CampaignName
			}
			wrapper('/BankAPIService.svc/createRBLPersonalLoanReq', 'POST', {
			 	"PersonalLoan":PersonalLoan
				  }, function(RBLData) {
				  	console.log("*********************RBLData***********************");
				console.log(RBLData);
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
				}else{
					base.send_response("Broker Id does not exist","",res);
				}
		    },6);
			
		};


module.exports = {"EarlySalary":EarlySalary,"KotakPersonalLoan":KotakPersonalLoan,"SaveExpressKotakLoanParameter":SaveExpressKotakLoanParameter,"HDFCPLParameter":HDFCPLParameter,"RupeeBossParameter":RupeeBossParameter,"BrokerIdEncodeParameter":BrokerIdEncodeParameter};