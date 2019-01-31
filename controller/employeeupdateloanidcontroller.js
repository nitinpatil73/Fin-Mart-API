var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

function RupeeBossFBARegistartionloanid(req, res, next) {
	// req.body.FBAID = FBAID;
	// req.body.fromrb = 1;
var converteddata = {
		FBAId : req.body.FBAID,
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
        regsource : 1,
        UID : req.body.UID
	};

	console.log("----------------log-----------------------");
	console.log(converteddata)
	console.log("----------------log-----------------------");
	var apiname = "/LoginDtls.svc/xmlservice/insFbaRegistration";

	// if(process.env.NODE_ENV == 'development'){
	// 	apiname = "/LoginDtls.svc/xmlservice/insFbaRegistrationForDC";
	// }
	wrapper(apiname, 'POST', 
    converteddata
  , function(data) {
	//console.log('--------UpdateLoanId data-------------');
	//console.log(data);

  	if(data.statusId == 0){
  		console.log('--------UpdateLoanId 1-------------');
  		UpdateLoanId(req.body.FBAID,data.result);	

  	}
  	else{
		var loan = new RBLog({ FBAId: FBAID,RequestString:req.body,IsActive:true });
		loan.save(function(err) {
			if(err){
				//console.log(err);
			};
		});
  	}
  },3);
}


function UpdateLoanId(FBAID,LoanId,req, res, next) {
	var fbausers = [];
	fbausers.push(FBAID); //p_FBAID        INT,
	fbausers.push(LoanId); 
	con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
		//console.log(loandata);
	});
	// console.log(personal);
}

module.exports = RupeeBossFBARegistartionloanid;