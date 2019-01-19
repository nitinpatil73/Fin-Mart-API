var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');


var login = function(req, res, next) {
var loginparameter = [];
loginparameter.push(req.body.UserName);
loginparameter.push(req.body.Password);
loginparameter.push(req.body.DeviceId);
loginparameter.push(req.body.IpAdd);
loginparameter.push(req.body.VersionNo);
loginparameter.push(req.body.TokenId);

	if (isNaN(req.body.UserName)) {
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
	 }else{
		con.execute_proc('call LandmarkValidUserCheck(?)',req.body.UserName,function(user_valid_data) {
		  	if(user_valid_data[0][0].SavedStatus == '0'){
		  		wrapper('/api/AuthenticateUser', 'POST', {
		  			"UserName":req.body.UserName,
				  	"Password":req.body.Password,
				  	"pwd":"",
				  	"IpAdd":req.body.IpAdd
				}, function(policybossvalidatedata) {
					if(policybossvalidatedata.Status == '0'){
						Landmarklogin(req.body.UserName,null,req.body.DeviceId,req.body.IpAdd,req.body.VersionNo,req.body.TokenId,req, res, next);
					}else{
						base.send_response("Invalid username or password", null,res);
					}
				},11);
		  	}else{
		  			base.send_response("User does not exists. Please contact HR", null,res); 		
		  		}
		});
	}
};

function Landmarklogin(UserName,Password,DeviceId,IpAdd,VersionNo,TokenId,req, res, next) {
	var loginparameter = [];
	loginparameter.push(UserName);
	loginparameter.push(Password);
	loginparameter.push(DeviceId);
	loginparameter.push(IpAdd);
	loginparameter.push(VersionNo);
	loginparameter.push(TokenId);
		con.execute_proc('call LandmarkValidateLogin(?,?,?,?,?,?)',loginparameter,function(data) {
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
}
module.exports = login;
