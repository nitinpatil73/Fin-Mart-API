var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var changepassword = function(req, res, next) {

	var changepassparameter = [];
	changepassparameter.push(req.body.FBAID);
	changepassparameter.push(req.body.Old_Password);
	changepassparameter.push(req.body.New_Password);
	con.execute_proc('call change_password(?,?,?)',changepassparameter,function(data) {
	if(data[0][0].SavedStatus == 0){
		base.send_response("Password change successfully.", data[0],res);
	}
	else{
		base.send_response("Old password not match", null,res);
	}	
});
};


module.exports = {"changepassword":changepassword};