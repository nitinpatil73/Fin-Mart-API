var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetAllFbaCrmMappingController = function(req, res, next) {
	con.execute_proc('call get_all_fba_crm_mapping_data(?)',req.body.FBAID,function(data) {
	    if(data != '' || data != null){
	        base.send_response("Success",data[0],res);
	    }
	    else{
	      	base.send_response("Failure",null,res);
	    }
	});
};
module.exports = GetAllFbaCrmMappingController;