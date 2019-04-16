var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
const https = require('http');

var SyncLeadDataSendSms = function(req, res, next) {
	if(req.body.fbaid != null && req.body.fbaid != '' && req.body.fbaid != '0'){
		con.execute_proc('call Get_fba_mobile(?)',req.body.fbaid,function(data) {
			if(data[0][0].MobiNumb1 != null && data[0][0].MobiNumb1 != ''){
				var mob = [];
				mob.push(data[0][0].MobiNumb1);
				var msg = "Dear Partner, Click on the link below to start with syncing contact to create leads from your existing base. For any assistance, contact your RRM. mgfm.in";
			    https.get('http://sms.cell24x7.com:1111/mspProducerM/sendSMS?user=rupee&pwd=apirupee&sender=FINMRT&mobile='+mob+'&msg='+msg+'&mt=0', (resp) => {
					base.send_response("Message send successfully.","success",res);
			 	});
			}else{
				base.send_response("Record does not find", "",res);
			}
		});
	}else{
		base.send_response("Please enter fbaid.",null,res);
	}
};


module.exports = {"SyncLeadDataSendSms" : SyncLeadDataSendSms};