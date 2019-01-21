var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var fbacustsmstemplate = function(req, res, next) {
	con.execute_proc('call get_fba_customers_sms_templete()',null,function(data) {
		if(data != null || data != ''){
			base.send_response("Get Successfully.",data[0],res);
		}else{
		    base.send_response("failed",null,res);
		}

	});
};

module.exports = {"fbacustsmstemplate" : fbacustsmstemplate};