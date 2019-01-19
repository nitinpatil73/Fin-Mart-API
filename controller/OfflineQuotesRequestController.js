var con=require('../bin/dbconnection');
var base=require('./baseController');

var OfflineQuotesRequest = function(req,res,next){
	if(req.body.FBAID != null && req.body.FBAID != ''){
		var OQRParameter = [];
		OQRParameter.push(req.body.FBAID);
		OQRParameter.push(req.body.ProductName);
		OQRParameter.push(req.body.ProductDiscription);
		OQRParameter.push(req.body.id);

		con.execute_proc('call insert_offline_quotes_request(?,?,?,?)',OQRParameter,function(data){
			if(data[0][0].SavedStatus =='0'){
				data[0][0].docstatus = data[1];
				base.send_response("Saved successfully.", data[0],res);
			}else{
				base.send_response("Failure",null,res);
			}
		});
	}else{
		base.send_response("Failure FBAID does not exists.",null,res);
	}
}

module.exports = {"OfflineQuotesRequest":OfflineQuotesRequest};