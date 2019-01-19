var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var VehicleInfoDetails = function(req, res, next){
	if(req.body.type == '1'){
		wrapper('/PolicyBossRegNoService.svc/GetRegNoData?v='+req.body.detail, 'GET',{
		},function(data){
			if(data != null && data != ''){
				var savevehiclelogpara = [];
				savevehiclelogpara.push(req.body.fbaid);
				savevehiclelogpara.push(req.body.type);
				savevehiclelogpara.push(req.body.detail);
				savevehiclelogpara.push(JSON.stringify(data.GetRegNoDataResult));
				con.execute_proc('call VehicleInfoDetailsLog(?,?,?,?)',savevehiclelogpara,function(dataresponce){
					if(dataresponce[0][0].ID == '0'){
						base.send_response("Record saved successfully",data,res);
					}else{
						base.send_response("Failure",null,res);
					}
				});
				
			}
			else{
				base.send_response("Failure",null,res);
			}
		},18);
	}else{
		base.send_response("Type not match",null,res);
	}
};

var VehicleInfoDetailsLog = function(req, res,next){
	var vehicledetaislogpara = [];
		vehicledetaislogpara.push(req.body.fbaid);
		vehicledetaislogpara.push(req.body.type);
		vehicledetaislogpara.push(req.body.detail);
		vehicledetaislogpara.push(req.body.data);
		con.execute_proc('call VehicleInfoDetailsLog(?,?,?,?)',vehicledetaislogpara,function(dataresponce){
		if(dataresponce[0][0].ID == '0'){
			base.send_response("Success",dataresponce[0][0].Message,res);
			}else{
				base.send_response("Failure",null,res);
			}
		});
}
module.exports = {"VehicleInfoDetails":VehicleInfoDetails,"VehicleInfoDetailsLog":VehicleInfoDetailsLog};
