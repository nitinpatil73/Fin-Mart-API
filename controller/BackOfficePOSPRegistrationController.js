var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var app = require('./wrapper.js');
var pospComman=require('./POSPCommanController');
var BackOfficepospregistration = function(req, res, next) {
	var backofficeparameter = [];
	backofficeparameter.push(req.body.FBAID)
	con.execute_proc('call BackOffice_POSP_Registration(?)',backofficeparameter,function(respdata) {
		if(respdata[0][0].Posp_PAN != null && respdata[0][0].Posp_PAN != '' && respdata[0][0].Other_PAN != null && respdata[0][0].Other_PAN != ''){
			var basicDetails = {
				"FirstName" : respdata[0][0].FirsName,
			    "LastName" : respdata[0][0].LastName,
			    "DateOfBirth" : respdata[0][0].DOB,
			    "Gender" : respdata[0][0].Gender,
			    "Mobile1" : respdata[0][0].MobiNumb1,
			    "Mobile2" : respdata[0][0].MobiNumb2,
			    "Email" : respdata[0][0].EmailID,
			    "PAN" : "",
			    "ServiceTaxNumber" : respdata[0][0].ServTaxNo
			};


			var address = {
				"Address1" : respdata[0][0].Address1,
				"Address2" : respdata[0][0].Address2,
				"Address3" : respdata[0][0].Address3,
				"Pincode" : respdata[0][0].PinCode,
			    "CityID" : respdata[0][0].City
			};


			var presentation = {
				"FirstName" : respdata[0][0].Posp_First_Name,
				"LastName" : respdata[0][0].Posp_Last_Name,
				"PAN" : respdata[0][0].Posp_PAN,
				"Aadhar" : respdata[0][0].Posp_Aadhaar,
				"BankAccountNumber" : respdata[0][0].Posp_BankAcNo,
				"AccountType" : respdata[0][0].Posp_Account_Type,
				"IFSCCode" : respdata[0][0].Posp_IFSC,
				"MICRCode" : respdata[0][0].Posp_MICR,
				"BankName" : respdata[0][0].Posp_BankName,
				"BankBranch" : respdata[0][0].Posp_BankBranch,
				"BankCity" : respdata[0][0].POSPBankCity

			};

			var nominee ={
				"FirstName" : respdata[0][0].Othe_First_Name,
				"LastName" : respdata[0][0].Othe_Last_Name,
				"PAN" : respdata[0][0].Other_PAN,
				"BankAccountNumber" : respdata[0][0].Other_BankAcNo,
				"AccountType" : respdata[0][0].Other_Account_Type,
				"IFSCCode" : respdata[0][0].Other_IFSC,
				"MICRCode" : respdata[0][0].Other_MICR,
				"BankName" : respdata[0][0].Other_BankName,
				"BankBranch" : respdata[0][0].Other_BankBranch,
				"BankCity" : ""
			};

			app('/api/pospregistration', 'POST', {
		    "FBAID" : req.body.FBAID,
			"SM_POSP_ID" : 0,
			"SM_POSP_Name" : "",
			"BasicDetails" : basicDetails,
			"Address" : address,
			"Presentation" : presentation,
			"Nominee" : nominee
		  }, function(data) {
		  	if(data!=null){	 
		  		if(data=="Email Id already exists"){
	  				base.send_response("Email Id already exists", null,res);
		  		}
		  		else{
		  			var borpospparam= [];
		  			borpospparam.push(req.body.FBAID);
		  			borpospparam.push(data);
	  				con.execute_proc('call UpdatePOSPNO(?,?)',borpospparam,function(respdata) {
	  					if(respdata[0][0].SavedStatus == 0){
	  						app('/api/Client/UpdatePospId', 'POST', {
	  							 "PospNo":data,
	  							 "ProdId":"",
	  							 "SuppAgentId":"",
	  							 "FBAId":req.body.FBAID
	  						}, function(UpdatePospIddata) {
	  							if(UpdatePospIddata != null){
	  								var finaldata = {"PospNo":data,"UpdatePospId":UpdatePospIddata};
	  								base.send_response("success",finaldata,res);
	  							}
	  							else{
	  								base.send_response("Update Posp Id Failure", null,res);
	  							}
	  						},13);	
	  						//base.send_response("success",respdata[0][0],res);
	  					}
						else{
							base.send_response("Failure", null,res);				
						}
	  				});
		  		} 
		  		//base.send_response("success",data,res);
		  	}
		  	else{	  		
		  		base.send_response("Invalid request", null,res);
		  	}
		  },2);		
		}
		else{
			base.send_response("Failure invalid request", null,res);				
		}	
	});
};

module.exports = {"BackOfficepospregistration":BackOfficepospregistration};