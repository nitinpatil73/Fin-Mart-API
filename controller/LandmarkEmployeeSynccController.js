var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');


var syncclandmarkemployee = function(req, res, next) {

var logsparameter = [];

con.execute_proc('call getlandmarklogin_temp()',logsparameter,function(data) {
	console.log("--------------------------test-------------------------------");
	console.log(data);
		for (var i=0;i<data[0].length; i++) {
			  var policybosspara = require('../controller/PolicybossFbaRegistrationController');
			  var reqdata= {};
			  reqdata.Name = data[0][i].Name;
			  reqdata.Mobile = data[0][i].Mobile;
			  reqdata.Email = data[0][i].Email;
			  reqdata.UID = data[0][i].UID;
			  reqdata.ss_id = data[0][i].ss_id;
				wrapper("/api/policyboss-fba-registration/", 'POST', 
			    reqdata
			  , function(data) {
			  
			  	console.log("------------------Wrapper Called-------------------")
					console.log(data);
			  },14);
  				
		}
		base.send_response("Success","Successfull uploaded",res);
    
	});
};
	module.exports = syncclandmarkemployee;