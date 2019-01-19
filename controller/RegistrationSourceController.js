var con = require('../bin/dbconnection.js');
var base = require('./baseController');

var GegistrationSource = function(req,res,next){
	con.execute_proc('call Get_Registration_Source()',null,function(data){
		if(data != null && data != ''){
			base.send_response("Records fetched successfully.",data[0],res);
		}else{
			base.send_response("No data found",null,res)
		}
	});
};
module.exports = {"GegistrationSource":GegistrationSource}
