var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var pospcommon = require('./POSPCommanController.js');



var getPOSPPaymentLink = function(req, res, next) {

var parameter = [];

if(req.body.FBAID){
parameter.push(req.body.FBAID);
	con.execute_proc('call getFBADetailsForPaymentLink(?)',parameter,function(data) {
	console.log("-----------" +data[0].length);
	if(data != null && data[0].length>0){
if(data[0][0].CustID){
	// CustID,mobileno,custname,emailid,fbaid,res,pospno,next
	pospcommon.GetProdPriceDeta(data[0][0].CustID,data[0][0].MobiNumb1,data[0][0].FullName,data[0][0].EmailID,req.body.FBAID,res,data[0][0].POSPNo,function(pay_data,status) {
		console.log(pay_data);
		console.log(status);
		if(status==1){
			base.send_response("Success", pay_data,res);
		}
		else{
			base.send_response("Something went wrong", null,res);		
		}
		
	});
	
}
else{
	base.send_response("Customer ID doesnot exists for given fba", null,res);		
}
		
		
	}
	else{
			base.send_response("FBA not found", null,res);		
	}
});
}
else{
	base.send_response("FBAID not passed", null,res);		
}
	
};


module.exports = {"getPOSPPaymentLink":getPOSPPaymentLink};
