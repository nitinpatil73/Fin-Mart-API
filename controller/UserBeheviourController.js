var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var UserBaheviourMobiledata = function(req, res, next) {
	var pushdata = [];
	pushdata.push(req.body.fba_id);
	pushdata.push(replaceAccents(req.body.bluetooth));
	pushdata.push(replaceAccents(req.body.wifi));
	pushdata.push(replaceAccents(req.body.installapps));
	pushdata.push(replaceAccents(req.body.defaultlanguage));
	console.log("-----------pushdata-----------------");
	console.log(pushdata);
	con.execute_proc('call save_user_behaviour_mobile_data(?,?,?,?,?)',pushdata,function(respdata) {
		if(respdata[0][0].statusid != null || respdata[0][0].statusid != ''){
			base.send_response("Success",respdata[0][0].Message,res);
		}else{
			base.send_response("Failure",null,res);
		}
	});
}

function replaceAccents(str) {
  return str.replace(/[^a-zA-Z0-9,-. ]/g,'');
}

module.exports = UserBaheviourMobiledata;