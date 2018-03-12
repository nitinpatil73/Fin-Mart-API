var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetContactUsInfo = function(req, res, next){
		var GetContactUsInfo = [];
		con.execute_proc('call getcontactusinfo()',null,function(data) {
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
module.exports = GetContactUsInfo;