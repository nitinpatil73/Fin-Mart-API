var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var UpdateRefererCode = function(req, res, next){
		var GetUpdateRefererCode = [];
		GetUpdateRefererCode.push(req.body.code);
		GetUpdateRefererCode.push(req.body.fba_id);	//
	//	console.log(GetUpdateRefererCode);
		con.execute_proc('call updateRefererCode(?,?)',GetUpdateRefererCode,function(data) {
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

module.exports = {"UpdateRefererCode" : UpdateRefererCode };