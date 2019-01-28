var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
const https = require('http');


var firsthivesendsms = function(req, res, next) {
    https.get('http://sms.cell24x7.com:1111/mspProducerM/sendSMS?user=rupee&pwd=apirupee&sender=FINMRT&mobile='+req.body.MobileNo+'&msg='+req.body.Message+'&mt=0', (resp) => {
		var firsthivesendsmspara = [];
		firsthivesendsmspara.push(req.body.MobileNo);
		firsthivesendsmspara.push(req.body.Message);
		con.execute_proc('call Save_FirstHiveSendSMSLog(?,?)',firsthivesendsmspara,function(data) {
			if(data != null || data != ''){
				base.send_response("Message send successfully.",data[0],res);
			}else{
				 base.send_response("Message send failed",null,res);
			}

		});
 	});
};

module.exports = {"firsthivesendsms" : firsthivesendsms};
