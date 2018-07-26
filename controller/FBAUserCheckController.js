var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');


var usercheckparameter = function(req, res, next) {
var usercheckparameter = [];
usercheckparameter.push(req.body.UserName);
usercheckparameter.push(req.body.Password);
	con.execute_proc('call FBAUSerCheck(?,?)',usercheckparameter,function(data) {
		if(data[0][0].SuccessStatus == "1"){
			base.send_response("Success",data[0][0],res);
		}
		else{
			base.send_response("Failure",null,res);				
		}
	});
};
module.exports = usercheckparameter;