var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetChildFBA = function(req, res, next) {
	con.execute_proc('call getChildFBA(?)',req.body.FBAID,function(data) {
	    if(data[0][0].statuscode != '1'){
	        base.send_response("Success",data[0],res);
	    }
	    else{
	      	base.send_response("Failure",null,res);
	    }
	});
};
module.exports = GetChildFBA;