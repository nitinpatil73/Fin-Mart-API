var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var getDynamicApp = function(req,res,next){
	con.execute_proc('call getDynamicAppMenu(?)',req.body.fbaid,function(data) {
		console.log()
		if(data != null && data != ''){
			var Menu = [];
			var Dashboard = [];
			for (var i = 0; i < data[0].length; i++) {
				var Menu_data = {
					"menuid": data[0][i].menuid,
		            "menuname": data[0][i].menuname,
		            "link": data[0][i].link,
		            "iconimage": data[0][i].iconimage,
		            "isActive":data[0][i].isActive,
		            "description": data[0][i].description,
		            "type": data[0][i].type,
		            "dashboard_type" : data[0][i].dashboard_type,
		            "sequence" : data[0][i].sequence
				};
				Menu.push(Menu_data);
			}
			for (var i = 0; i < data[1].length; i++) {
				var Dashboard_data = {
					"menuid": data[1][i].menuid,
		            "menuname": data[1][i].menuname,
		            "link": data[1][i].link,
		            "iconimage": data[1][i].iconimage,
		            "isActive":data[1][i].isActive,
		            "description": data[1][i].description,
		            "type": data[1][i].type,
		            "dashboard_type": data[1][i].dashboard_type,
		            "sequence" : data[1][i].sequence
				};
				Dashboard.push(Dashboard_data);
			}
			var Responce = {"Menu":Menu,"Dashboard":Dashboard};
			base.send_response("Success",Responce,res);
		}else{
			base.send_response("No data found",null,res);
		}
   	});
};

module.exports = {"getDynamicApp":getDynamicApp};
