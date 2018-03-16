var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
const https = require('http');
class SMSController{};
//for sending OTP
SMSController.sendMessage = function (phoneno, message) {
https.get("http://vas.mobilogi.com/api.php?username=rupeeboss&password=pass1234&route=1&sender=FINMRT&mobile[]="+phoneno+"&message[]="+message, (resp) => {

 });
};

SMSController.send = function (req, res, next) {
	group=req.body.group_id;
	if(!group){
		 base.send_response("group id required",null,res);
	}
	get_data(group,function(data){
            //console.log(data)
            if(!data)
            {
                base.send_response("Failure","",res);
            }else{
                get_mobiles_and_msg(data,function(data){
                    send_sms(data,function(msgid){
                        msg=msgid.split(":");
                        if(msg.length==2){
                            update_msg_id(group,msg[1]);
                            base.send_response("Success",msg[1],res);
                        }
                            //base.send_response("Failure",msg,res);
                    });
		});
            }
		
	});
    //res.send(now);
}
function send_sms(data,cb){
    //console.log("sendsm")
   var request = require('request');
   var url='http://vas.mobilogi.com/api.php?username=rupeeboss&password=pass1234&route=1&sender=FINMRT&mobile[]='+data.mobile+'&message[]=test';
   console.log(url);
   request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    cb(body);
  }else{
      cb(null);
  }
});
}
function get_mobiles_and_msg(data,cb){
	
	var mobiles="";
	//console.log(data[0][0].mobileno);
        for (var i = 0, len = data[0].length; i < len; i++) {
            mobiles+=(data[0][i].mobileno);
            
            if(i < len-1){
                mobiles+=",";
            }
          }
	cb({mobile:mobiles,msg:data[0][0].mobileno});
}
function get_data(group,cb){
	//curr=get_curr_dateTime();

		con.execute_proc('call get_sms(?)',[group],function(data) {
			if(data!==null)
			{
				cb(data);		
			}
			else
			{
				cb(null);
			}	
	   	});


}
function update_msg_id(group,msgid){
    con.execute_proc('call update_msgid(?,?)',[group,msgid],function(data) {
			if(data!==null)
			{
				console.log("msgid updated");
			}
			else
			{
				console.log("msgid updation failed");
			}	
	   	});
}
function get_curr_dateTime(){
	var dt = new Date();
    var year, month, day;
    year = String(dt.getFullYear());
    month = String(dt.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(dt.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day+" "+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
}
module.exports=SMSController;