var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetConstantData = function(req, res, next){
		var GetConstantData = [];
		GetConstantData.push(req.body.FBAID);		
		con.execute_proc('call Get_Constant_Data(?)',GetConstantData,function(data) {
		if(data!=null){
			// console.log(data[0].length);
			// var response = [];
			// for (var i = 0; i < data[0].length; i++) {
			// 	console.log(data[0][i].ConstantName );
			// 	response.push({data[0][i].ConstantName,data[0][i].ConstantValue});// = data[0][i].ConstantValue;
				
			// }
			// console.log(response);
			base.send_response("Success", data[0],res);		
		}
		else{
			base.send_response("No data found",null,res);
		}
   	});
}


module.exports = {"GetConstantData":GetConstantData};	