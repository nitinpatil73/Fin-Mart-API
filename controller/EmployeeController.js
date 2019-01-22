var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var getFieldSales = function(req, res, next) {		
	con.execute_proc('call getFieldSales()',null,function(data) {
	if(data != null && data != ''){
	    base.send_response("Success", data[0],res);
	}else{
		base.send_response("Failed to fetch", null,res);
	}
	});	
};
module.exports = {"getFieldSales" : getFieldSales};