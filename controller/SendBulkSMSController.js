var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
const https = require('http');

var sendbulksms = function(req, res, next) {


if(req.body.parentgroup){

var param = [];
param.push(req.body.parentgroup);
	con.execute_proc('call get_sms_parentgroup(?)',param,function(data) {
	//	console.log(data);
	//	console.log(data[0].length);
			if(data!=null && data[0].length>0){
				for (var i = 0; i < data[0].length; i++) {
					con.execute_proc('call get_sms(?)',data[0][i].group_id,function(smsdata) {
					//	console.log(smsdata);
						if(smsdata!=null){
							var mobiles="";
							for (var i = 0, len = smsdata[0].length; i < len; i++) {
					            mobiles+=(smsdata[0][i].mobileno);
					            
					            if(i < len-1){
					                mobiles+=",";
					            }
					          }
					        //  console.log(mobiles);
					          if(mobiles!=""){
								 	var request = require('request');
								 	var=message=encodeURIComponent(smsdata.msg);
								 	var url='http://alrt.co.in/http-api.php?username=finmrt&password=pass1234&senderid=FINMRT&route=2&number='+mobiles+',&message='+message;
								   	//var url='http://vas.mobilogi.com/api.php?username=finmrt&password=pass1234&route=5&sender=FINMRT&mobile[]='+mobiles+'&message[]='+message ;
								   	request(url, function (error, response, body) {
									  if (!error && response.statusCode == 200) {
									//   console.log(body);
									   msg=msgid.split(":");
				                        if(msg.length==2){
				                        	//update_msg_id(data[0][i].group_id,);
				                            update_msg_id(data[0][i].group_id,msg[1]);				                     
				                        }									   
									  }else{
									    //  console.log("error");
									  }
					          }
						}
				
	   				});
				}
			}	
			base.send_response("Successfully send", null,res);
	});
}
else{
	base.send_response("parentgroup group not passed", null,res);		
}

}
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



module.exports={"sendbulksms" :sendbulksms };