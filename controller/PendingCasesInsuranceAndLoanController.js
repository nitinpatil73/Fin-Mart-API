var con = require('../bin/dbconnection');
var base = require('./baseController');

var PendingCaseInsurenceAndLoan = function(req,res,next){
	var pendingpara = [];
	if(req.body.FBAID != null && req.body.FBAID != ''){
		pendingpara.push(req.body.FBAID);
		if(req.body.count != null && req.body.count != ''){
			pendingpara.push(req.body.count);
		}else{
			pendingpara.push(0);
			req.body.count=0;
		}
		if(req.body.Type != null && req.body.Type != ''){
			pendingpara.push(req.body.Type);
			if(req.body.Type == '0'){
				con.execute_proc('call Pending_cases_insurance_and_loan(?,?,?)',pendingpara,function(data) {
			    	if(data != null && data != ''){
			    		var Insurance = [];
			    		var Loan = [];
			    		for (var i = 0; i < data[0].length; i++) {
			    			var InsuranceResponce = {
			    				"Id":data[0][i].Id,
			    				"CustomerName":data[0][i].CustomerName,
			    				"Category":data[0][i].Category,
			    				"qatype":data[0][i].qatype,
			    				"ApplnStatus":data[0][i].ApplnStatus,
			    				"mobile":data[0][i].mobile,
			    				"quotetype":data[0][i].quotetype,
			    				"ApplicationNo":data[0][i].ApplicationNo,
			    				"created_date":data[0][i].created_date,
			    				"BankImage":data[0][i].BankImage,
			    				"cdate":data[0][i].cdate,
			    				"pendingdays":data[0][i].pendingdays
			    			}
			    			Insurance.push(InsuranceResponce);
			    		}

			    		for (var i = 0; i < data[1].length; i++) {
			    			var LoanResponce = {
			    				"Id":data[1][i].Id,
			    				"CustomerName":data[1][i].CustomerName,
			    				"Category":data[1][i].Category,
			    				"qatype":data[1][i].qatype,
			    				"ApplnStatus":data[1][i].ApplnStatus,
			    				"mobile":data[1][i].mobile,
			    				"quotetype":data[1][i].quotetype,
			    				"ApplicationNo":data[1][i].ApplicationNo,
			    				"created_date":data[1][i].created_date,
			    				"BankImage":data[1][i].BankImage,
			    				"cdate":data[1][i].cdate,
			    				"pendingdays":data[1][i].pendingdays,
			    				"Lead_Id":data[1][i].Lead_Id
			    			}
			    			Loan.push(LoanResponce);
			    		}
			    		var FinalResponce = {"Insurance":Insurance,"Loan":Loan};
						base.send_response("Success",FinalResponce,res);
					}
					else{
						base.send_response("Failure", null,res);				
					}
				});
			}else if(req.body.Type == '1'){
				con.execute_proc('call Pending_cases_insurance_and_loan(?,?,?)',pendingpara,function(data) {
			    	if(data != null && data != ''){
			    		var Insurance = [];
			    		var Loan = [];
			    		for (var i = 0; i < data[0].length; i++) {
			    			var InsuranceResponce = {
			    				"Id":data[0][i].Id,
			    				"CustomerName":data[0][i].CustomerName,
			    				"Category":data[0][i].Category,
			    				"qatype":data[0][i].qatype,
			    				"ApplnStatus":data[0][i].ApplnStatus,
			    				"mobile":data[0][i].mobile,
			    				"quotetype":data[0][i].quotetype,
			    				"ApplicationNo":data[0][i].ApplicationNo,
			    				"created_date":data[0][i].created_date,
			    				"BankImage":data[0][i].BankImage,
			    				"cdate":data[0][i].cdate,
			    				"pendingdays":data[0][i].pendingdays
			    			}
			    			Insurance.push(InsuranceResponce);
			    		}
			    		var FinalResponce = {"Insurance":Insurance,"Loan":[]};
						base.send_response("Success",FinalResponce,res);
					}
					else{
						base.send_response("Failure", null,res);				
					}
				});
			}else if(req.body.Type == '2'){
				con.execute_proc('call Pending_cases_insurance_and_loan(?,?,?)',pendingpara,function(data) {
			    	if(data != null && data != ''){
			    		var Insurance = [];
			    		var Loan = [];
			    		for (var i = 0; i < data[0].length; i++) {
			    			var LoanResponce = {
			    				"Id":data[0][i].Id,
			    				"CustomerName":data[0][i].CustomerName,
			    				"Category":data[0][i].Category,
			    				"qatype":data[0][i].qatype,
			    				"ApplnStatus":data[0][i].ApplnStatus,
			    				"mobile":data[0][i].mobile,
			    				"quotetype":data[0][i].quotetype,
			    				"ApplicationNo":data[0][i].ApplicationNo,
			    				"created_date":data[0][i].created_date,
			    				"BankImage":data[0][i].BankImage,
			    				"cdate":data[0][i].cdate,
			    				"pendingdays":data[0][i].pendingdays,
			    				"Lead_Id":data[0][i].Lead_Id
			    			}
			    			Loan.push(LoanResponce);
			    		}
			    		var FinalResponce = {"Insurance":[],"Loan":Loan};
						base.send_response("Success",FinalResponce,res);
					}
					else{
						base.send_response("Failure", null,res);				
					}
				});
			}else{
				base.send_response("Type not match", null,res);
			}
		}else{
			base.send_response("Type not passed", null,res);
		}
	}else{
		base.send_response("FBAID not passed", null,res);
	}
};
module.exports = {"PendingCaseInsurenceAndLoan":PendingCaseInsurenceAndLoan};