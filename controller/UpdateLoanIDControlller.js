
var wrapper = require('./wrapper.js');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');


var updateloanid = function (req, res, next) {
wrapper('/LoginDtls.svc/XMLService/updateFBALoanId', 'POST', {
   "fbaid" : req.body.fbaid
  }, function(data) {
    if(data!=null && data.loanId != 0 && data.loanId != ''){
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
		if(fbadata[0].length>0)
		{
			var converteddata = {
					"FBAID": fbadata[0][0].FBAID ,
		            "FirsName": fbadata[0][0].FirsName ,
		            "LastName": fbadata[0][0].LastName ,
		            "DOB": fbadata[0][0].DOB ,
		            "MobiNumb1": fbadata[0][0].MobiNumb1 ,
		            "MobiNumb2": fbadata[0][0].MobiNumb2 , 
		            "EmailID": fbadata[0][0].EmailID , 
		            "Address1": fbadata[0][0].Address1 , 
		            "Address2": fbadata[0][0].Address2 , 
		            "Address3": fbadata[0][0].Address3 , 
		            "PinCode": fbadata[0][0].PinCode , 
		            "City": fbadata[0][0].City , 
		            "StatID": fbadata[0][0].StatID ,
		            "IsLifeInsu": fbadata[0][0].IsLifeInsu , 
		            "LifeComp": fbadata[0][0].LifeComp , 
		            "IsGeneInsu": fbadata[0][0].IsGeneInsu , 
		            "GeneComp": fbadata[0][0].GeneComp , 
		            "IsHealthInsu": fbadata[0][0].IsHealthInsu , 
		            "HealthComp": fbadata[0][0].HealthComp ,
		            "IsMutualFund": fbadata[0][0].IsMutualFund ,
		           
				    "IsStocks": fbadata[0][0].IsStocks , 
		            
					"IsPostSavi": fbadata[0][0].IsPostSavi , 
		            
					"IsBonds": fbadata[0][0].IsBonds , 
		            
		            "POSPName": fbadata[0][0].POSPName , 
		            "POSPPAN": fbadata[0][0].POSPPAN , 
		            "POSPAadh": fbadata[0][0].POSPAadh , 
		            "POSPBankAccoNo": fbadata[0][0].POSPBankAccoNo , 
		            "POSPBankAccoType": fbadata[0][0].POSPBankAccoType , 
					"POSPBankIFSCCode": fbadata[0][0].POSPBankIFSCCode , 
		            "POSPBankMICRCode": fbadata[0][0].POSPBankMICRCode , 
		            "POSPBankName": fbadata[0][0].POSPBankName , 
		            "POSPBankBran": fbadata[0][0].POSPBankBran , 
					"POSPBankCity": fbadata[0][0].POSPBankCity , 
					 
		            "LoanName": fbadata[0][0].LoanName , 
		            "LoanPAN": fbadata[0][0].LoanPAN , 
		            "LoanAadh": fbadata[0][0].LoanAadh , 
		            "LoanBankAccoNo": fbadata[0][0].LoanBankAccoNo , 
		            "LoanBankAccoType": fbadata[0][0].LoanBankAccoType , 
					"LoanBankIFSCCode": fbadata[0][0].LoanBankIFSCCode , 
		            "LoanBankMICRCode": fbadata[0][0].LoanBankMICRCode , 
		            "LoanBankName": fbadata[0][0].LoanBankName , 
		            "LoanBankBran": fbadata[0][0].LoanBankBran , 
		            "Loan_BankCity": fbadata[0][0].Loan_BankCity  
			}
			var apiname = "/LoginDtls.svc/xmlservice/insFbaRegistration";
				wrapper(apiname, 'POST', 
			    converteddata
			  , function(data) {
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
			base.send_response("Given FBAId does not exists!",null, res);
		}

	});
}
module.exports = {"updateloanid":updateloanid};
