var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var Get_Offline_Quotes = function(req, res, next) {
	if(req.body.FBAID != null && req.body.FBAID != ''){
		con.execute_proc('call Get_Offline_Quotes(?)',req.body.FBAID,function(data) {
			if(data != null && data != ''){
				var result = [];
				for (var i = 0; i < data[0].length; i++) {
					var doc = [];
					for (var j = 0; j < data[1].length; j++) {
					   	if(data[0][i].id == data[1][j].quotes_request_id)
					    {
							doc.push(data[1][j])
						}
					}
					var dataresult = {
						"id": data[0][i].id,
						"FBAID": data[0][i].FBAID,
						"product_name": data[0][i].product_name,
						"Quote_description": data[0][i].Quote_description,
						"Status": data[0][i].Status,
						"Quote_status":data[0][i].Quote_status,
						"Comment": data[0][i].Comment,
						"Amount": data[0][i].Amount,
						"Converted_date": data[0][i].Converted_date,
						"Created_date": data[0][i].Created_date,
						"editable": data[0][i].editable,
						"Documents" : doc
					};
					result.push(dataresult);
				}
			    base.send_response("Success",result,res);
			}
			else{
			    base.send_response("Failure",null,res);
			}
		});
	}else{
		base.send_response("Failure FBAID does not exists.",null,res);
	}
};

module.exports = {"Get_Offline_Quotes":Get_Offline_Quotes};