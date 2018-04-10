var con=require('../bin/dbconnection.js');
var base = require('./baseController');


var UpdatePartnerinfo = function(req, res, next){
		var parameter = [];

		if(req.body.FBAId && req.body.PartnerId){
			parameter.push(req.body.FBAId);
			parameter.push(req.body.PartnerId);
			parameter.push(req.body.PartName);
			parameter.push(req.body.PartMobiNumb);
			parameter.push(req.body.PartEmailId);
			parameter.push(req.body.PartAddr);
			parameter.push(req.body.PartCity);
			parameter.push(req.body.PartPincode);

			con.execute_proc('call sp_update_Partner_Info(?,?,?,?,?,?,?,?)',parameter,function(data) {
				console.log(data);
				if(data!=null){
					base.send_response("Success",data[0],res);
				}
				else{
					base.send_response("No data found",null,res);
				}	
	   		});
		}
		else{
			base.send_response("Some data missing ",null,res);
		}
		
	
}

module.exports = {"UpdatePartnerinfo":UpdatePartnerinfo}