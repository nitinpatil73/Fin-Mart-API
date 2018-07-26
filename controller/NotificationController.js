var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var UserNotificationOpen = function(req, res, next){
		var UserNotificationOpen = [];
		UserNotificationOpen.push(req.body.UserNotificationRequestId);	//
	//	console.log(UserNotificationOpen);
		con.execute_proc('call updatenotificationopen(?)',UserNotificationOpen,function(data) {
	//	console.log(data);
		if(data[0][0].SavedStatus == 0)
		{
			base.send_response("Success", data[0][0],res);
		}
		else
		{
			base.send_response("Failure", null,res);				
		}
   	});
}

var GetNotificationList = function(req, res, next){
		var GetNotificationList = [];
		GetNotificationList.push(req.body.FBAID);	//
	//	console.log(GetNotificationList);
		con.execute_proc('call GetNotificationList(?)',GetNotificationList,function(data) {
		if(data!=null && data[0].length>0){
			var url = "http://bo.magicfinmart.com/";
		  	if(process.env.NODE_ENV == 'development'){		       
		        url = "http://bo.mgfm.in/";
		    }		    

			for (var i = 0; i < data[0].length; i++) {
				data[0][i].img_url = url + data[0][i].img_url;
			}

			base.send_response("Success", data[0],res);		
		}
		else{
			base.send_response("No data found",null,res);
		}
   	});
}

module.exports = {"UserNotificationOpen":UserNotificationOpen,"GetNotificationList":GetNotificationList};