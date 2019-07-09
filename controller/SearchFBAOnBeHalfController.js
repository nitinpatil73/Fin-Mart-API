var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var SearchFbaOnBeHalf = function(req, res, next){
		var parameter = [];
		parameter.push(req.body.fbaid);
		parameter.push(req.body.count);
		parameter.push(req.body.search);	
		con.execute_proc('call fbaListapp_additional(?,?,?)',parameter,function(data) {
		if(data!=null || data != '')
		{
			base.send_response("Success",data[0],res);		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}
module.exports = {"SearchFbaOnBeHalf":SearchFbaOnBeHalf};