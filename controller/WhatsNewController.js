var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var WhatsNew = function(req, res, next){
		var WhatsNew = [];
		WhatsNew.push(req.body.app_version);	//
		console.log(WhatsNew);
		con.execute_proc('call whatsnew(?)',WhatsNew,function(data) {
		console.log(data);
		if(data!=null)
		{
			base.send_response("Success", data[0],res);		
		}
		else{
			base.send_response("No data found",null,res);
		}
		
   	});
}
module.exports = WhatsNew;