var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var backofficelog = function(req, res, next) {

var logsparameter = [];
logsparameter.push(req.body.APIName);	 
logsparameter.push(req.body.JsonData);
logsparameter.push(req.body.FBAID);
logsparameter.push(req.body.Source);
//console.log(logsparameter);


con.execute_proc('call usp_insert_backofficelogs(?,?,?,?)',logsparameter,function(data) {
//	console.log(data);
//console.log(data[0][0]);
    if(data[0][0].SavedStatus=="0"){
      base.send_response("Success", data[0],res);
    }
    else{
      base.send_response("Failure",null,res);
    }
	});
};
	module.exports = backofficelog;