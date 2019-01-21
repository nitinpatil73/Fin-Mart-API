var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var PospAppointmentsEmail = function(req, res, next) {
	if(req.body.fbaid != null || req.body.fbaid != ''){
		var appointmentsparameter = [];
		appointmentsparameter.push(req.body.fbaid);
		appointmentsparameter.push(req.body.url);
		appointmentsparameter.push(req.body.type);
		con.execute_proc('call save_posp_appointment_email(?,?,?)',appointmentsparameter,function(data) {
			if(data != null || data != ''){
				base.send_response("saved Successfully.",data[0],res);
			}else{
			    base.send_response("save failed",null,res);
			}

		});
	}else{
		base.send_response("Please enter fbaid",null,res);
	}
};

module.exports = {"PospAppointmentsEmail" : PospAppointmentsEmail};