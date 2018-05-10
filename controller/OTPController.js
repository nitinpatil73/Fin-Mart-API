var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var SaveOTP = function(req, res, next) {

var opt = [];
opt.push('C');
opt.push(req.body.MobileNo);
opt.push(null);
opt.push(null);
opt.push(null);

con.execute_proc('call CreateOTPTransaction(?,?,?,?,?)',opt,function(data) {
	if(data[0][0].Result == "1"){
			// console.log("Your One Time Password(OTP) for Magic Finmart is "+ data[0][0].MobileOTP + ". PLEASE DON NOT STARE THE OTP WITH ANYONE.");
			if(data[0][0].MobileOTP){
				console.log("Your One Time Password(OTP) for Magic Finmart is "+ data[0][0].MobileOTP + ". PLEASE DO NOT SHARE THE OTP WITH ANYONE.");
				//sms(req.body.MobileNo,"Your One Time Password(OTP) for Magic Finmart is "+ data[0][0].MobileOTP + ". PLEASE DO NOT SHARE THE OTP WITH ANYONE.");
				var handler = require('../controller/SmsController');
				handler.sendMessage(req.body.MobileNo,"Your One Time Password(OTP) for Magic Finmart is "+ data[0][0].MobileOTP + ". PLEASE DO NOT SHARE THE OTP WITH ANYONE.");
				
			}
			//sms(req.body.MobileNo,"Your One Time Password(OTP) for Magic Finmart is "+ data[0][0].MobileOTP + ". PLEASE DON NOT STARE THE OTP WITH ANYONE.");
			base.send_response(data[0][0].Message, data,res);
	}
	else{
			base.send_response(data[0][0].Message, null,res);				
	}
});
};

var GetOTP = function(req, res, next) {

var opt = [];
opt.push('V');
opt.push(req.body.MobileNo);
opt.push(null);
opt.push(req.body.MobileOTP);
opt.push(null);

con.execute_proc('call CreateOTPTransaction(?,?,?,?,?)',opt,function(data) {
	if(data[0][0].Result == "1"){

			base.send_response(data[0][0].Message, data,res);

	}
	else{
			base.send_response(data[0][0].Message, null,res);				
	}
});
};

function sms(mob,mess,req, res, next){
 // var handler = require('../controller/SMSController');
 // var data = handler.sendMessage(mob,mess);
base.send_response("success", "success",res);

// wrapper('/LoginDtls.svc/xmlservice/sendSMS', 'POST', {
//     "mobNo":mob,
// 	"msgData":mess,
// 	"source":"app"
//   }, function(data) {
//     console.log(data);
//   	if(data!=null){
//   		console.log('SMS send success:' + data);
// 	  	//base.send_response("success",data, res);
//   	}
//   	else{
//   		console.log('SMS send Failure:' + data);
//   		//base.send_response("failure",data, res);
//   	}
//   },4);

// return  options = {
//     method: 'POST',
//     uri: 'http://services.rupeeboss.com/LoginDtls.svc/xmlservice/sendSMS',
//     body: {
//          "mobNo":"8898540057",
// "msgData":mess,
// "source":"web"
//     },
//     json: true // Automatically stringifies the body to JSON
// };

}

module.exports = {"SaveOTP" : SaveOTP , "GetOTP" : GetOTP };
