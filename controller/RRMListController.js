var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetRrmList = function(req, res, next){
		con.execute_proc('call getRRMList()',null,function(data) {
		if(data != null && data != '')
		{
			base.send_response("Success",data[0],res);		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
};

var GetRrmFblMapping = function(req, res, next){
		con.execute_proc('call getRRMFBAList()',null,function(resdata) {
		if(resdata != null && resdata != '')
		{
			base.send_response("Success",resdata[0],res);		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
};
module.exports = {"GetRrmList":GetRrmList,"GetRrmFblMapping":GetRrmFblMapping};