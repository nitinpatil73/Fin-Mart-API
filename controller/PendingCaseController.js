var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var pendingCases = function(req, res, next) {

var parameter = [];

if(req.body.FBAID){
	parameter.push(req.body.FBAID);
if(req.body.count){
	parameter.push(req.body.count);
}
else{
	parameter.push(0);
}

console.log(parameter);

con.execute_proc('call getPendingcases(?,?)',parameter,function(data) {
	console.log(data);
	if(data != null){
		base.send_response("Success", data[0],res);
	}
	else{
		base.send_response("Failure", null,res);				
	}
});
}
else{
	base.send_response("FBAID not passed", null,res);		
}

};

var DeleteQuoteFromPendingCase = function(req, res, next) {

var parameter = [];

if(req.body.id && req.body.quotetype){
parameter.push(req.body.id);
parameter.push(req.body.quotetype);
	if(req.body.quotetype=='QL'){
		wrapper('/BankAPIService.svc/DeleteOtherLoanLeadReq', 'POST', {
	      "Lead_Id":req.body.id,
	    }, function(data) {
	    if(data!=null){
	      var delrespose = JSON.parse(data);
	      if(delrespose.Status=='1')
	      {
	          var delparameter = [];
	          delparameter.push(req.body.id);
	          delparameter.push(req.body.quotetype);
	           con.execute_proc('call DeleteQuoteFromPendingCase(?,?)',delparameter,function(delrespdata) {
	            if(delrespdata[0][0].SavedStatus == 0){
	              base.send_response("Success",delrespdata[0],res);
	            }else{
	              base.send_response("Failure", null,res);       
	            } 
	          });
	      }
	      else
	      {
	         base.send_response("Failure", null,res); 
	      }
	      //base.send_response("Success",delrespose,res); 
	    }
	    else{
	      base.send_response("Failure", null,res);    
	    } 
	  },6);
	}else{
		con.execute_proc('call DeleteQuoteFromPendingCase(?,?)',parameter,function(data) {
			console.log(data);
			if(data[0][0].SavedStatus == 0){
				base.send_response("Success", data[0],res);
			}
			else{
				base.send_response("Failure", null,res);				
			}
		});
	}
}
else{
	base.send_response("Some details missing", null,res);		
}

};
module.exports = {"pendingCases":pendingCases,"DeleteQuoteFromPendingCase":DeleteQuoteFromPendingCase};
