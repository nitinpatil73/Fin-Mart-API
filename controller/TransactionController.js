var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var UpdateQuotStatus = function(req, res, next) {	
	if(req.body.FBAId && req.body.QuotId && req.body.TranType && req.body.QuotStat){
		var parameter = [];
		parameter.push(req.body.FBAId);
		parameter.push(req.body.QuotId);	
		parameter.push(req.body.TranType);
		parameter.push(req.body.QuotStat);

		con.execute_proc('call UpdateQuotStatus(?,?,?,?)',parameter,function(data) {
			console.log(data);
	      if(data[0][0].SavedStatus=="0"){
	        base.send_response("Success", data[0],res);
	      }
	      else{
	        base.send_response(data[0][0].Message,null,res);
	      }
	  	});
	}
	else{
		base.send_response("Some Data Missing", "",res);
	}
};

var UpdateApplnNo = function(req, res, next) {
	if(req.body.FBAId && req.body.QuotId && req.body.TranType && req.body.ApplNumb && req.body.ApplDate){
		var parameter = [];
		parameter.push(req.body.FBAId);
		parameter.push(req.body.QuotId);
		parameter.push(req.body.TranType);
		parameter.push(req.body.ApplNumb);
		parameter.push(req.body.ApplDate);

		con.execute_proc('call UpdateApplnNo(?,?,?,?,?)',parameter,function(data) {
	      if(data[0][0].SavedStatus=="0"){
	        base.send_response("Success", data[0],res);
	      }
	      else{
	        base.send_response("Failure",null,res);
	      }
	  	});
	}
	else{
		base.send_response("Some Data Missing", "",res);
	}
};

var UpdatePOSPStatus = function(req, res, next) {


if(!req.body.PospNo){
	base.send_response("Fba Id should not be blank",null,res);
}
else if(!req.body.PospStatus){
	base.send_response("Posp status Should not be blank",null,res);
}
else if(req.body.PospStatus == 0 || req.body.PospStatus >  13){
	base.send_response("Posp status not Found",null,res);
}
else{
		var parameter = [];
		parameter.push(req.body.PospNo);
		parameter.push(req.body.PospStatus);
		con.execute_proc('call spUpdtPospStatus(?,?)',parameter,function(data) {
	      if(data[0][0].SavedStatus=="0"){
	        base.send_response("Success", data[0],res);
	      }
	      else{
	        base.send_response("Failure",null,res);
	      }
	  	});
	} 
};


var UpdateBankId = function(req, res, next) {


	var parameter = [];
	parameter.push(req.body.loan_requestID);
	parameter.push(req.body.bank_id);	
	parameter.push(req.body.type);		
	con.execute_proc('call update_bank_id(?,?,?)',parameter,function(data) {
	  if(data[0][0].SavedStatus=="0"){
	    	base.send_response("Success", data[0],res);
	  }
	  else{
	    	base.send_response("Failure",null,res);
	  }
	});
};

var UpdateQuoteToApplicationStatus = function(req, res, next) {	
	if(req.body.FBAId && req.body.QuotId && req.body.TranType && req.body.QuotStat){
		var parameter = [];
		parameter.push(req.body.FBAId);
		parameter.push(req.body.QuotId);	
		parameter.push(req.body.TranType);
		parameter.push(req.body.QuotStat);
		if(req.body.ApplNumb){
			parameter.push(req.body.ApplNumb);
		}
		else{
			parameter.push(null);	
		}
		con.execute_proc('call UpdateQuoteToApplicationStatus(?,?,?,?,?)',parameter,function(data) {
			console.log(data);
	      if(data[0][0].SavedStatus=="0"){
	        base.send_response("Success", data[0],res);
	      }
	      else{
	        base.send_response(data[0][0].Message,null,res);
	      }
	  	});
	}
	else{
		base.send_response("Some Data Missing", "",res);
	}
};



var AddPaymentInfo = function(req, res, next) {
var parameter = [];
parameter.push(req.body.FBAId);
parameter.push(req.body.PayRefrenceID);
parameter.push(req.body.DWTCustID);
parameter.push(req.body.PaytStatus);
parameter.push(req.body.PaidDate);
parameter.push(req.body.Amount);
parameter.push(req.body.InvoiceURLPath);
parameter.push(req.body.PCode);
console.log(parameter);
con.execute_proc('call sp_UpdateFBA_Regis_Payment(?,?,?,?,?,?,?,?)',parameter,function(data) {
	  if(data[0][0].SavedStatus=="0"){
	    base.send_response("Success", data[0],res);
	  } 
	  else{
	    base.send_response("Failure",null,res);
	  }
});

/*if(!req.body.PospNo){
	base.send_response("Fba Id should not be blank",null,res);
}
else if(!req.body.PospStatus){
	base.send_response("Posp status Should not be blank",null,res);
}
else if(req.body.PospStatus == 0 || req.body.PospStatus >  13){
	base.send_response("Posp status not Found",null,res);
}
else{
		var parameter = [];
		parameter.push(req.body.PospNo);
		parameter.push(req.body.PospStatus);
		con.execute_proc('call spUpdtPospStatus(?,?)',parameter,function(data) {
	      if(data[0][0].SavedStatus=="0"){
	        base.send_response("Success", data[0],res);
	      }
	      else{
	        base.send_response("Failure",null,res);
	      }
	  	});
	} */
};

var getIFSCCode = function(req, res, next) {	
	if(req.body.IFSCCode){
		var parameter = [];
		parameter.push(req.body.IFSCCode);
		con.execute_proc('call getIFSCCode(?)',parameter,function(data) {
			console.log(data);
			if(data[0]!=null){
				if(data[0].length>0){
					base.send_response("Success", data[0],res);	  
				}
				else{
					base.send_response("Failure", null,res);	 
				}
				   
			}
			else{
				base.send_response("Failure", null,res);	 
			}
	  	});
	}
	else{
		base.send_response("IFSC Code missing", "",res);
	}
};

var updateRefererCode = function(req, res, next) {	
	if(req.body.code){
		var parameter = [];
		parameter.push(req.body.code);
		con.execute_proc('call getIFSCCode(?)',parameter,function(data) {
			console.log(data);
			if(data[0]!=null){
				if(data[0].length>0){
					base.send_response("Success", data[0],res);	  
				}
				else{
					base.send_response("Failure", null,res);	 
				}
				   
			}
			else{
				base.send_response("Failure", null,res);	 
			}
	  	});
	}
	else{
		base.send_response("Code missing", "",res);
	}
};

var insertPaymentLink = function(req, res, next){
		var parameter = [];
		parameter.push(req.body.FBAId);
		parameter.push(req.body.PayURL);
		parameter.push(req.body.PayRefrenceID);
		parameter.push(req.body.DWTCustID);
		parameter.push(501);
		console.log(parameter);
		con.execute_proc('call sp_InsPaymentlink(?,?,?,?,?)',parameter,function(respdata) {
			console.log(respdata);
		if(respdata[0][0].SavedStatus == 0){
				base.send_response("Success", respdata[0],res);				
		}
		else{
			base.send_response("Failure", null,res);	
		}	
	});
}
module.exports = {"UpdateQuotStatus" : UpdateQuotStatus ,"UpdateApplnNo" : UpdateApplnNo,"UpdatePOSPStatus" : UpdatePOSPStatus,"AddPaymentInfo":AddPaymentInfo,"UpdateBankId": UpdateBankId,"UpdateQuoteToApplicationStatus":UpdateQuoteToApplicationStatus,"getIFSCCode":getIFSCCode,"insertPaymentLink":insertPaymentLink};