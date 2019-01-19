var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var vehicleinsubtype = function(req, res, next){
		con.execute_proc('call get_vehicleinsurencesubtype()',null,function(data) {
		if(data!=null)
		{
			base.send_response("Success",data[0],res);		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}
module.exports = {"vehicleinsubtype":vehicleinsubtype};