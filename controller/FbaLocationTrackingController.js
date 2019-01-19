var con=require('../bin/dbconnection');
var base=require('./baseController');

var FbaLocationTracking = function(req,res,next){
	var TrackingParameter = [];
	TrackingParameter.push(req.body.fbaid);
	TrackingParameter.push(req.body.lat);
	TrackingParameter.push(req.body.long);
	con.execute_proc('call FbaLocationTracking(?,?,?)',TrackingParameter,function(Responce){
		if(Responce[0][0].Success == "0")
		{
			base.send_response("Success",Responce[0][0],res);
		}
		else
		{
			base.send_response("Failure",null,res);
		}
	});
};

module.exports = FbaLocationTracking;
