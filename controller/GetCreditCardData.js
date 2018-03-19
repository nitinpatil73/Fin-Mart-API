var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var getCreditCardDataParameter = function(req, res, next){
		var getCreditCardDataParameter = [];
		con.execute_proc('call CreditCardDetails()',null,function(data) {
		if(data!=null)
		{
			for (var i = 0; i < data[1].length; i++) {
			data[1][i].ImagePath = "http://"+ req.headers.host + "/images/creditcard/" + data[1][i].ImagePath;										
		}

			base.send_response("Success",{"filter":data[0],"filterdata":data[1]},res);
			//}		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}

module.exports = getCreditCardDataParameter;