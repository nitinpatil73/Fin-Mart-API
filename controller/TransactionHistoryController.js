var con=require('../bin/dbconnection.js');
var base = require('./baseController');


var getTransactionHistory = function(req, res, next) {

 
//console.log(logsparameter);
var parameter = [];
parameter.push(req.body.fbaid);
parameter.push(req.body.pageno);

con.execute_proc('call getTransactionHistory(?,?)',parameter,function(data) {
	 if(data != null && data != '')
        {
        	 if(data[0][0] != null && data[0][0] != ''){
					base.send_response("Success",data[0],res);
        	 }
        	 else{
        	 		base.send_response("No data available",null,res);
        	 }
            
        }
        else
        {
            base.send_response("No data available",null,res);
        }
	});
};
module.exports = {"getTransactionHistory":getTransactionHistory};