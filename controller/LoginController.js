var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');


var login = function(req, res, next) {

// console.log(res.body);
var loginparameter = [];
loginparameter.push(req.body.UserName);
loginparameter.push(req.body.Password);
loginparameter.push(req.body.DeviceId);
loginparameter.push(req.body.IpAdd);
loginparameter.push(req.body.VersionNo);
loginparameter.push(req.body.TokenId);

con.execute_proc('call spValidateLogin(?,?,?,?,?,?)',loginparameter,function(data) {
	if(data[0][0].SuccessStatus == "1"){
		if(data[0][0].POSPNo == null){
			data[0][0].SuppAgenId = "5";
		}
		data[0][0].POSPInfo = data[0][0].POSPName + "~" + data[0][0].POSPMobile + "~" + data[0][0].POSEmail;
        data[0][0].FSM = data[0][0].FSMFullname + "~" + data[0][0].FSMEmail + "~" + data[0][0].FSMMobile + "~" + data[0][0].FSMDesig;
        if(data[0][0].POSPProfileUrl){
        	data[0][0].POSPProfileUrl = "http://"+ req.headers.host + "/" + data[0][0].POSPProfileUrl;
        }
        if(data[0][0].FBAProfileUrl){
        	data[0][0].FBAProfileUrl = "http://"+ req.headers.host + "/"+  data[0][0].FBAProfileUrl;
        }
		base.send_response("Success", data[0][0],res);
	}
	else{
			base.send_response("Invalid username or password", null,res);				
	}
});

};



module.exports = login;