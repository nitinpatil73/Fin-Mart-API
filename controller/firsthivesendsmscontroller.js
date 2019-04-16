var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
const https = require('http');


var firsthivesendsms = function(req, res, next) {
	if(req.body.MobileNo.length == '10'){
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
	}else{
		base.send_response("Please enter 10 digit no.",null,res);
	}
};

var liquiloansms = function(req, res, next) {
	if(req.body.fbaid != null && req.body.fbaid != '' && req.body.fbaid != '0'){
		var pushdata = [];
		pushdata.push(req.body.fbaid);
		pushdata.push(req.body.stage);
		pushdata.push(req.body.customer_id);
		pushdata.push(req.body.name);
		pushdata.push(req.body.amount);
		pushdata.push(req.body.investment_request_id);
		pushdata.push(req.body.tenure);
		pushdata.push(req.body.roi);
		pushdata.push(req.body.message);
		con.execute_proc('call GetLiquiLoanSMSData(?,?,?,?,?,?,?,?,?)',pushdata,function(data) {
			var mob = [];
			mob.push(data[0][0].MobiNumb1);
			mob.push(data[0][0].MobileNo);
		    https.get('http://sms.cell24x7.com:1111/mspProducerM/sendSMS?user=rupee&pwd=apirupee&sender=FINMRT&mobile='+mob+'&msg='+req.body.Message+'&mt=0', (resp) => {
				var pushsmspara = [];
				pushsmspara.push(req.body.fbaid);
				pushsmspara.push(req.body.message);
				con.execute_proc('call PushLiquiLoanSMSData(?,?)',pushsmspara,function(data) {
					if(data != null || data != ''){
						base.send_response("Message send successfully.","success",res);
					}else{
						 base.send_response("Message send failed",null,res);
					}

				});
		 	});
		});
	}else{
		base.send_response("Please enter fbaid.",null,res);
	}
};

module.exports = {"firsthivesendsms" : firsthivesendsms,"liquiloansms":liquiloansms};
