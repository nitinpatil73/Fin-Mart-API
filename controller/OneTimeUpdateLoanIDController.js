var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var OneTimeUpdateLoanIDController = function(req, res, next) {
	con.execute_proc('call OneTimeUpdateUIDLoanId()',null,function(fetchdata) {
		if(fetchdata != null && fetchdata != ''){
			var converteddata = [];
			//console.log(fetchdata[0][0].FBAID);
			// for (var i = 0; i < fetchdata[0].length; i++) {
				for (var i = 0; i < fetchdata[0].length; i++) {
				//console.log(fetchdata[0][i].FBAID);
				//console.log("********************************");
			    var converteddata = {
				   "FBAId" : fetchdata[0][i].FBAID,
			       "First_Name": "",
				   "Last_Name": "",
				   "DOB": "",
				   "Mobile_No1": "",
				   "Mobile_No2": "",
				   "Email": "",
				   "Address1": "",
				   "Address2": "",
				   "Address3": "",
				   "Pincode": "",
				   "City": "",
				   "State": "",
				   "Life_Insurance": "0",
				   "Life_Insurance_Comp": "",
				   "General_Insurance": "0",
				   "General_Insurance_Comp": "",
				   "Health_Insurance": "0",
				   "Health_Insurance_Comp": "",
				   "Mutual_Fund": "0",
				   "Mutual_Fund_Comp": "",
				   "Stocks": "0",
				   "Stocks_Comp": "",
				   "Postal_Savings": "0",
				   "Postal_Savings_Comp": "",
				   "Bonds": "0",
				   "Bonds_Comp": "",
				   "POSP_First_Name": "",
				   "POSP_Last_Name": "",
				   "POSP_Pan_No": "",
				   "POSP_Aadhar_Card_No": "",
				   "POSP_Bank_Accnt_No": "",
				   "POSP_Accnt_Type": "",
				   "POSP_IFSC_Code": "",
				   "POSP_MICR_Code": "",
				   "POSP_Bank_Name": "",
				   "POSP_Bank_Branch": "",
				   "POSP_Bank_City": "",
				   "Representative_First_Name": "",
				   "Representative_Last_Name": "",
				   "Representative_Pan_Nov": "",
				   "Representative_Aadhar_Card_No": "",
				   "Representative_Bank_Accnt_No": "",
				   "Representative_Accnt_Type": "",
				   "Representative_IFSC_Code": "",
				   "Representative_MICR_Code": "",
				   "Representative_Bank_Name": "",
				   "Representative_Bank_Branch": "",
				   "Representative_Bank_City": "",
			       "regsource" : 1,
			       "UID" : fetchdata[0][i].UID
				};
				//console.log("--------------if fetch data-------------------");
			  //  console.log(converteddata);
			    var apiname = "/LoginDtls.svc/xmlservice/insFbaRegistration";
			    	wrapper(apiname, 'POST', 
				    converteddata
				  , function(data) {
					console.log('--------UpdateLoanId data-------------');
					console.log(data);
				  	if(data.statusId == 0){
						console.log('--------if-------------');	
						console.log(data.statusId);	
						
					}else{
						console.log('--------else------------');
				  	}
				},3);
			}
			base.send_response("Success", "data completed" ,res);
		}else{
			console.log("--------------else fetch data-----------------");
			console.log(fetchdata);
		}
	});
};

module.exports = OneTimeUpdateLoanIDController;