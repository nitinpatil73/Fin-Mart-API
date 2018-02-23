var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var pendingCases = function(req, res, next) {

var parameter = [];

if(req.body.FBAID){
parameter.push(req.body.FBAID);

console.log(parameter);

con.execute_proc('call getPendingcases(?)',parameter,function(data) {
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

console.log(parameter);

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
else{
	base.send_response("Some details missing", null,res);		
}

};
module.exports = {"pendingCases":pendingCases,"DeleteQuoteFromPendingCase":DeleteQuoteFromPendingCase};
