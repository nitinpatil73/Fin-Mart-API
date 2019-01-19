var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var usercalled = function(req, res, next) {
	if(req.body.FBAID.length>0){
			console.log("----------------------------------");
			con.execute_proc('call User_Called(?)',req.body.FBAID,function(data) {
			console.log("----------------------------------");
			console.log(data);
			if(data[0][0].SavedStatus=='0'){
				base.send_response("Success",data[0],res);
			}
			else{
				base.send_response("Failure", null,res);
			}	
		});
	}
	else
	{
		base.send_response("Failure FBAID does not exists.", null,res);
	}
};


module.exports = {"usercalled":usercalled};