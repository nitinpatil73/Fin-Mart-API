var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetSalesMaterial = function(req, res, next){
		var GetSalesMaterial = [];
		con.execute_proc('call SalesMaterial()',null,function(data) {
		if(data!=null)
		{
			for (var i = 0 ; i < data[0].length; i++) {
				data[0][i].Product_image = "http://" + req.headers.host + "/images/salesmaterial/"+ data[0][i].Product_image;
			}
			base.send_response("Success", data[0],res);		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}

var GetSalesMaterialDocs = function(req, res, next){
		var GetSalesMaterialDocs = [];
		GetSalesMaterialDocs.push(req.body.product_id);	//
		console.log(GetSalesMaterialDocs);
		con.execute_proc('call GetSalesMaterialDocs(?)',GetSalesMaterialDocs,function(data) {
		if(data!=null)
		{
			var company = data[0];
			var docs = data[1];
			for (var i = 0; i < docs.length; i++) {
				// docs[i].image_path ="http://" + req.headers.host +"/"+ docs[i].image_path;
				docs[i].image_path ="http://bo.magicfinmart.com/" + docs[i].image_path;
			}
			var response = { "company" : company , "docs":docs};
			base.send_response("Success",response,res);
			//}		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}

module.exports = {"GetSalesMaterial":GetSalesMaterial,"GetSalesMaterialDocs":GetSalesMaterialDocs};