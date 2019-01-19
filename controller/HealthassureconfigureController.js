var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetHelthAssureData = function(req, res, next){
		var GetHelthassureData = [];
		GetHelthassureData.push(req.body.FBAID);		
		con.execute_proc('call Health_Assure_Configure(?)',GetHelthassureData,function(data) {
			//console.log("-------------------------------------------------");
			//console.log(data);
		if(data[0] != null && data[0] != ''){
			base.send_response("Success",data[0],res);

		}
		else{
			base.send_response("FBAID does not exists.",null,res);
		}
   	});

}


module.exports = {"GetHelthAssureData":GetHelthAssureData};	