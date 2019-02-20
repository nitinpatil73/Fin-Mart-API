var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var request = require("request");

var FirstHive = function(req, res, next) {
	con.execute_proc('call N_Get_First_Hive_Data()',null,function(respdatasub) {
		if(respdatasub != null || respdatasub != ''){
			for (var i = 0; i < respdatasub[0].length; i++) {
				 console.log("----------------11-----------------");
				 console.log(respdatasub[0][i].FBAID);
				firsthivecreateuser(respdatasub[0][i].FBAID,
					respdatasub[0][i].FullName,
					respdatasub[0][i].Source_name,
					respdatasub[0][i].Pincode,
					respdatasub[0][i].City,
					respdatasub[0][i].state_name,
					respdatasub[0][i].zone,
					respdatasub[0][i].MobiNumb1,
					respdatasub[0][i].EmailID,
					respdatasub[0][i].Certification_Status,
					respdatasub[0][i].PaidDate,
					req, res, next); 
			}
			base.send_response("Success","Success",res);
		}else{
			base.send_response("Failure",null,res);
		}
	});
}

var FirstHivecreateadminuser = function(req, res, next) {
	con.execute_proc('call N_Get_First_Hive_Create_Admin_Data()',null,function(resadmin) {
		if(resadmin != null || resadmin != ''){
			for (var i = 0; i < resadmin[0].length; i++) {
				 console.log("----------------11-----------------");
				 console.log(resadmin[0][i].UID);
				pushfirsthivecreateadminuser(resadmin[0][i].UID,
					resadmin[0][i].FBA_ID,
					resadmin[0][i].Name,
					resadmin[0][i].Mobile_No,
					resadmin[0][i].EMail,
					resadmin[0][i].Profile,
					resadmin[0][i].Employee_Category,
					resadmin[0][i].Designation,
					resadmin[0][i].Status,
					resadmin[0][i].Location_Access,
					req, res, next); 
			}
			base.send_response("Success","Success",res);
		}else{
			base.send_response("Failure",null,res);
		}
	});
}

var FirstHiveusermapping = function(req, res, next) {
	con.execute_proc('call N_Get_First_Hive_usermapping()',null,function(resusermapping) {
		if(resusermapping != null || resusermapping != ''){
			for (var i = 0; i < resusermapping[0].length; i++) {
				 console.log("----------------11-----------------");
				 console.log(resusermapping[0][i].fba_id);
				pushfirsthiveusermapping(resusermapping[0][i].fba_id,
					resusermapping[0][i].rrmuid,
					resusermapping[0][i].fieldsalesuid,
					resusermapping[0][i].fieldmanageruid,
					resusermapping[0][i].clusterheaduid,
					resusermapping[0][i].stateheaduid,
					resusermapping[0][i].zonalheaduid,
					req, res, next); 
			}
			base.send_response("Success","Success",res);
		}else{
			base.send_response("Failure",null,res);
		}
	});
}

function firsthivecreateuser(FBAID,FullName,Source_name,Pincode,City,state_name,zone,MobiNumb1,EmailID,Certification_Status,PaidDate,req, res, next){
	console.log("----------------in function-----------------");
		var options = { method: 'POST',
  			url: 'http://labs.firsthive.com:7070/policy_boss/user/createuser',
  		headers: 
   		{ 'Postman-Token': 'a16227ea-1f55-45fb-bebe-78e60342e01f',
     	'cache-control': 'no-cache',
     	accessKey: 'vZ2ZNkdDTWXCOzURJLEgXHbGmbmdrM64eH6nHZ1cf7o3UOq70UCGAOpMcqpVVEIg',
     	'Content-Type': 'application/x-www-form-urlencoded' },
		  form: 
		   { fbaId:FBAID,
		     fbaName:FullName,
		     campaign:Source_name,
		     pincode:Pincode,
		     city:City,
		     state:state_name,
		     zone:zone,
		     mobileNo:MobiNumb1,
		     email:EmailID,
		     certificationStatus:Certification_Status,
		     paymentDate:SubPospEntryformatDate(PaidDate),
		     other1: '',
		     other2: '',
		     other3: '',
		     other4: '' } };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  var respose = JSON.parse(body);
		  console.log(respose.success);
		  if(respose.success == true){
		  	  	con.execute_proc('call update_status_first_hive_user(?)',FBAID,function(updatestatus) {
					if(updatestatus[0][0].statusid != null || updatestatus[0][0].statusid != ''){
						console.log("---------------Success-----------");
			  			console.log(updatestatus[0][0].Message);
			 		}else{
						console.log("---------------failure1-----------");
					}
				});
		  }else{
		  	  console.log("---------------failure2-----------");
		  }
		});
}

function pushfirsthivecreateadminuser(UID,FBA_ID,Name,Mobile_No,EMail,Profile,Employee_Category,Designation,Status,Location_Access,req, res, next){
	console.log("---------------- adminuser in function-----------------");
	var options = { method: 'POST',
	  url: 'http://labs.firsthive.com:7070/policy_boss/user/createadminuser',
	  headers: 
	   { 'Postman-Token': '6cbaa1b3-edba-43d2-8f07-f7e5c9d207bb',
	     'cache-control': 'no-cache',
	     accessKey: 'vZ2ZNkdDTWXCOzURJLEgXHbGmbmdrM64eH6nHZ1cf7o3UOq70UCGAOpMcqpVVEIg',
	     'Content-Type': 'application/x-www-form-urlencoded' },
	  form: 
	   { uid:UID,
	     fbaId:FBA_ID,
	     name:Name,
	     mobileNo:Mobile_No,
	     email:EMail,
	     profile:Profile,
	     employeeCategory:Employee_Category,
	     designation:Designation,
	     status:Status,
	     locationAccess:Location_Access,
	     other1: '',
	     other2: '',
	     other3: ''} };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	   	  var respose = JSON.parse(body);
		  console.log(respose.success);
		  if(respose.success == true){
		  	  	con.execute_proc('call update_status_first_hive_admin(?)',FBA_ID,function(updatestatus) {
					if(updatestatus[0][0].statusid != null || updatestatus[0][0].statusid != ''){
						console.log("---------------Success-----------");
			  			console.log(updatestatus[0][0].Message);
			 		}else{
						console.log("---------------failure1-----------");
					}
				});
		  }else{
		  	  console.log("---------------failure2-----------");
		  }
	});	
}

function pushfirsthiveusermapping(fba_id,rrmuid,fieldsalesuid,fieldmanageruid,clusterheaduid,stateheaduid,zonalheaduid,req, res, next){
	console.log("----------------user mapping in function-----------------");
	var options = { method: 'POST',
	  url: 'http://labs.firsthive.com:7070/policy_boss/user/usermapping',
	  headers: 
	   { 'Postman-Token': '8e19f38d-5331-477e-b740-439f8fe1d892',
	     'cache-control': 'no-cache',
	     accessKey: 'vZ2ZNkdDTWXCOzURJLEgXHbGmbmdrM64eH6nHZ1cf7o3UOq70UCGAOpMcqpVVEIg',
	     'Content-Type': 'application/json' },
	  form: 
	   { fbaId:fba_id,
	     rrm:rrmuid,
	     fieldSales:fieldsalesuid,
	     finmartSalesManager:fieldmanageruid,
	     clusterHead:clusterheaduid,
	     stateHead:stateheaduid,
	     zonalHead:zonalheaduid,
	     other1: '',
	     other2: '',
	     other3: '',
	     other4: '',
	     other5: '' } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  	 var respose = JSON.parse(body);
		  console.log(respose.success);
		  if(respose.success == true){
		  	  	con.execute_proc('call update_status_first_hive_user_mapping(?)',fba_id,function(updatestatus) {
					if(updatestatus[0][0].statusid != null || updatestatus[0][0].statusid != ''){
						console.log("---------------Success-----------");
			  			console.log(updatestatus[0][0].Message);
			 		}else{
						console.log("---------------failure1-----------");
					}
				});
		  }else{
		  	  console.log("---------------failure2-----------");
		  }
	});
}

function SubPospEntryformatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month,year].join('-');
}

module.exports = {"FirstHive":FirstHive,"FirstHivecreateadminuser":FirstHivecreateadminuser,"FirstHiveusermapping":FirstHiveusermapping};