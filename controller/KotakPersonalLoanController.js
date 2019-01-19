var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var KotakPersonalparameter = function (req, res, next) {
			var response = ("{\"?xml\":{\"@version\":\"1.0\",\"@encoding\":\"UTF-8\"},\"Response\":{\"@xmlns:ns0\":\"http://www.kotak.com/schemas/PersonalLoanResponse.xsd\",\"Status\":\"3\",\"ReferenceCode\":\"#PLT75JIPHT\",\"EligLnAmt\":\"0\",\"ROI\":\"0\",\"ErrorCode\":\"0\",\"ErrorInfo\":null,\"RequestIP\":\"10.10.3.144\"}}");
		 if(response != null){
		 	  js=JSON.parse(response);
		 	  var kotakparameter = [];
		 	  kotakparameter.push(js.Response.ReferenceCode);
		     	 var ExpressLoan = require('./ExpressLoan');
		     	 ExpressLoan.SaveExpressLoanParameter(1,req, res,kotakparameter, function(data){
		     	 	console.log(data);
		     	 });
		 		// console.log("-------------------------");
		 		// console.log(kotakparameter);
		        base.send_response("success",js,res);    
		     }
		     else{
		        base.send_response("Failed to fetch", null,res);
		     }

		// wrapper('/BankAPIService.svc/createKotakPersonalLoanReq', 'POST', {

		// 	 	"IsExstCust": req.body.PersonalLoan.IsExstCust,
		// 	    "ExstCustType": req.body.PersonalLoan.ExstCustType,
		// 	    "CRN": req.body.PersonalLoan.CRN,
		// 	    "PartyID": req.body.PersonalLoan.PartyID,
		// 	    "FirstName": req.body.PersonalLoan.FirstName,
		// 	    "MiddleName": req.body.PersonalLoan.MiddleName,
		// 	    "LastName": req.body.PersonalLoan.LastName,
		// 	    "Gender": req.body.PersonalLoan.Gender,
		// 	    "Qualification": req.body.PersonalLoan.Qualification,
		// 	    "DOB": req.body.PersonalLoan.DOB,
		// 	    "Mobile": req.body.PersonalLoan.Mobile,
		// 	    "Email": req.body.PersonalLoan.Email,
		// 	    "Aadhar": req.body.PersonalLoan.Aadhar,
		// 	    "PAN": req.body.PersonalLoan.PAN,
		// 	    "EmpType": req.body.PersonalLoan.EmpType,
		// 	    "Company_Cat": req.body.PersonalLoan.Company_Cat,
		// 	    "Organization": req.body.PersonalLoan.Organization,
		// 	    "CurCmpnyJoinDt": req.body.PersonalLoan.CurCmpnyJoinDt,
		// 	    "TotWrkExp": req.body.PersonalLoan.TotWrkExp,
		// 	    "OffAddress1": req.body.PersonalLoan.OffAddress1,
		// 	    "OffAddress2": req.body.PersonalLoan.OffAddress2,
		// 	    "OffAddress3": req.body.PersonalLoan.OffAddress3,
		// 	    "OffCity": req.body.PersonalLoan.OffCity,
		// 	    "OffPin": req.body.PersonalLoan.OffPin,
		// 	    "OffPhone": req.body.PersonalLoan.OffPhone,
		// 	    "PrefMailAdd": req.body.PersonalLoan.PrefMailAdd,
		// 	    "ResAddress1": req.body.PersonalLoan.ResAddress1,
		// 	    "ResAddress2": req.body.PersonalLoan.ResAddress2,
		// 	    "ResAddress3": req.body.PersonalLoan.ResAddress3,
		// 	    "ResCity": req.body.PersonalLoan.ResCity,
		// 	    "ResPin": req.body.PersonalLoan.ResPin,
		// 	    "ResType": req.body.PersonalLoan.ResType,
		// 	    "CurResSince": req.body.PersonalLoan.CurResSince,
		// 	    "ResPhNo": req.body.PersonalLoan.ResPhNo,
		// 	    "same": req.body.PersonalLoan.same,
		// 	    "PerAddress1": req.body.PersonalLoan.PerAddress1,
		// 	    "PerAddress2": req.body.PersonalLoan.PerAddress2,
		// 	    "PerAddress3": req.body.PersonalLoan.PerAddress3,
		// 	    "PerCity": req.body.PersonalLoan.PerCity,
		// 	    "PerPin": req.body.PersonalLoan.PerPin,
		// 	    "PerResPhNo": req.body.PersonalLoan.PerResPhNo,
		// 	    "NMI": req.body.PersonalLoan.NMI,
		// 	    "EmiCurPay": req.body.PersonalLoan.EmiCurPay,
		// 	    "LnAmt": req.body.PersonalLoan.LnAmt,
		// 	    "TnrMths": req.body.PersonalLoan.TnrMths,
		// 	    "IRR": req.body.PersonalLoan.IRR,
		// 	    "ProcFee": req.body.PersonalLoan.ProcFee,
		// 	    "IsCoApp": req.body.PersonalLoan.IsCoApp,
		// 	    "CoAppReltn": req.body.PersonalLoan.CoAppReltn,
		// 	    "CoAppDOB": req.body.PersonalLoan.CoAppDOB,
		// 	    "CoAppEmpType": req.body.PersonalLoan.CoAppEmpType,
		// 	    "CoAppOrg": req.body.PersonalLoan.CoAppOrg,
		// 	    "CoAppNMI": req.body.PersonalLoan.CoAppNMI,
		// 	    "CoAppEmiCurPay": req.body.PersonalLoan.CoAppEmiCurPay,
		// 	    "Version": req.body.PersonalLoan.Version,
		// 	    "brokerid": req.body.PersonalLoan.brokerid,
		// 	    "empid": req.body.PersonalLoan.empid,
		// 	    "source": req.body.PersonalLoan.source,
		// 	    "CampaignName": req.body.PersonalLoan.CampaignName

		//   }, function(response) {
		//      if(response != null){
		//         base.send_response("success",response,res);    
		//      }
		//      else{
		//         base.send_response("Failed to fetch", null,res);
		//      }
		//   },6);
	};


// 	var SaveExpressLoanKotakParameter = function(req, res,kotakparameter, next) {
// 	var SaveLoankotakParameter = [];

// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.FirstName + " " + req.body.PersonalLoan.LastName);
// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.Mobile);
// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.OffCity);
// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.LnAmt);
// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.BankId);
// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.LoanType);
// 	  SaveLoankotakParameter.push(req.body.PersonalLoan.FBAID);
// 	  SaveLoankotakParameter.push(kotakparameter);
 
// 	con.execute_proc('call SaveExpressLoanRequest(?,?,?,?,?,?,?,?)',SaveLoankotakParameter,function(savedata) {
//     next(savedata);
// });

// }
module.exports = {"KotakPersonalparameter":KotakPersonalparameter};