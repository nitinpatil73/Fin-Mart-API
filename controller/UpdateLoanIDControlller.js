
var wrapper = require('./wrapper.js');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');


var updateloanid = function (req, res, next) {
wrapper('/LoginDtls.svc/XMLService/updateFBALoanId', 'POST', {
   "fbaid" : req.body.fbaid
  }, function(data) {
  	//	console.log("*************************data***************************");
	//	console.log(data);
    if(data!=null && data.loanId != 0 && data.loanId != ''){
    //	console.log("-------------------data.loanId---------------------");
 	//	console.log(data.loanId);
    var loan = [];
	loan.push(req.body.fbaid); //p_FBAID        INT,
	loan.push(data.loanId); 
	con.execute_proc('call UpdateLoanId(?,?)',loan,function(loandata) {
		if(loandata!=null && loandata[0][0].SavedStatus==0){
				base.send_response("Loan Id updated successfully!",loandata[0],res);
		}
		else{
			base.send_response(loandata[0][0].Message,null,res);
		}
	});
    }
    else{
    	GetFBAData(req.body.fbaid,req, res, next);
        //base.send_response("failure",null, res);
    }
  },3);

};


function GetFBAData(FBAID,req, res, next) {
	
	con.execute_proc('call GetLoanFBAData(?)',FBAID,function(fbadata) {
		//console.log("*************************fbadata***************************");
		//console.log(fbadata);
		if(fbadata[0].length>0)
		{
			var converteddata = {
					"FBAId": fbadata[0][0].FBAID ,
		            "First_Name": fbadata[0][0].FirsName ,
		            "Last_Name": fbadata[0][0].LastName ,
		            "DOB": fbadata[0][0].DOB ,
		            "Mobile_No1": fbadata[0][0].MobiNumb1 ,
		            "Mobile_No2": fbadata[0][0].MobiNumb2 , 
		            "Email": fbadata[0][0].EmailID , 
		            "Address1": fbadata[0][0].Address1 , 
		            "Address2": fbadata[0][0].Address2 , 
		            "Address3": fbadata[0][0].Address3 , 
		            "Pincode": fbadata[0][0].PinCode , 
		            "City": fbadata[0][0].City , 
		            "State": fbadata[0][0].StatID ,
		            "Life_Insurance": "false",     //fbadata[0][0].IsLifeInsu , 
		            "Life_Insurance_Comp": fbadata[0][0].LifeComp , 
		            "General_Insurance": "false",//fbadata[0][0].IsGeneInsu , 
		            "General_Insurance_Comp": fbadata[0][0].GeneComp , 
		            "Health_Insurance": "false",//fbadata[0][0].IsHealthInsu , 
		            "Health_Insurance_Comp": fbadata[0][0].HealthComp ,
		            "Mutual_Fund": "false",//fbadata[0][0].IsMutualFund ,
		           
				    "Stocks": "false",//fbadata[0][0].IsStocks , 
		            
					"Postal_Savings": "false",//fbadata[0][0].IsPostSavi , 
		            
					"Bonds": "false",//fbadata[0][0].IsBonds , 
		            
		            "POSP_First_Name": fbadata[0][0].POSPName , 
		            "POSP_Pan_No": fbadata[0][0].POSPPAN , 
		            "POSP_Aadhar_Card_No": fbadata[0][0].POSPAadh , 
		            "POSP_Bank_Accnt_No": fbadata[0][0].POSPBankAccoNo , 
		            "POSP_Accnt_Type": fbadata[0][0].POSPBankAccoType , 
					"POSP_IFSC_Code": fbadata[0][0].POSPBankIFSCCode , 
		            "POSP_MICR_Code": fbadata[0][0].POSPBankMICRCode , 
		            "POSP_Bank_Name": fbadata[0][0].POSPBankName , 
		            "POSP_Bank_Branch": fbadata[0][0].POSPBankBran , 
					"POSP_Bank_City": fbadata[0][0].POSPBankCity , 
					 
		            "Representative_First_Name": fbadata[0][0].LoanName , 
		            "Representative_Pan_No": fbadata[0][0].LoanPAN , 
		            "Representative_Aadhar_Card_No": fbadata[0][0].LoanAadh , 
		            "Representative_Bank_Accnt_No": fbadata[0][0].LoanBankAccoNo , 
		            "Representative_Accnt_Type": fbadata[0][0].LoanBankAccoType , 
					"Representative_IFSC_Code": fbadata[0][0].LoanBankIFSCCode , 
		            "Representative_MICR_Code": fbadata[0][0].LoanBankMICRCode , 
		            "Representative_Bank_Name": fbadata[0][0].LoanBankName , 
		            "Representative_Bank_Branch": fbadata[0][0].LoanBankBran , 
		            "Representative_Bank_City": fbadata[0][0].Loan_BankCity,
		            "regsource" : 1,
		            "UID":"0"  
			}

		//	console.log("'''''''''''''''''''''");
		//	console.log(converteddata);
			var apiname = "/LoginDtls.svc/xmlservice/insFbaRegistration";
				wrapper(apiname, 'POST', 
			    converteddata
			  , function(data) {
			//  	console.log("*************************insFbaRegistration***************************");
			//	console.log(data);
			  	if(data.statusId == 0)
			  	{
			  		var updatparameter = [];
				 	updatparameter.push(req.body.fbaid);
				 	updatparameter.push(data.result); 
			  		con.execute_proc('call UpdateLoanId(?,?)',updatparameter,function(loandata) {
						if(loandata!=null && loandata[0][0].SavedStatus==0){
							base.send_response("Loan Id updated successfully!",loandata[0],res);
						}
						else{
							base.send_response(loandata[0][0].Message,null,res);
						}
					});
			  		//base.send_response("Success",data[0],res);
			  	}
			  	else
			  	{
			  		base.send_response("failure",null, res);
			  	}
			},3);
			//base.send_response("Success",fbadata[0],res);
		}
		else
		{
			base.send_response("FBAId does not exists!",null, res);
		}

	});
}
module.exports = {"updateloanid":updateloanid};
