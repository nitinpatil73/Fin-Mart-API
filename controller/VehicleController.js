var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var handler = require('./HandlerController');
var wrapper = require('./wrapper.js');
var managevehicle = function(req, res, next) {

var vehicleparameter = [];

if(req.body.VehicleRequestID){
	vehicleparameter.push(req.body.VehicleRequestID);	//
}
else{
	vehicleparameter.push(null);
}
vehicleparameter.push(req.body.motorRequestEntity.birth_date);
vehicleparameter.push(req.body.fba_id);//
vehicleparameter.push(req.body.motorRequestEntity.product_id);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_id);
vehicleparameter.push(req.body.motorRequestEntity.rto_id);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_insurance_type);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_manf_date);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_registration_date);
vehicleparameter.push(req.body.motorRequestEntity.policy_expiry_date);
vehicleparameter.push(req.body.motorRequestEntity.prev_insurer_id);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_registration_type);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_ncb_current);
vehicleparameter.push(req.body.motorRequestEntity.is_claim_exists);
vehicleparameter.push(req.body.motorRequestEntity.method_type);
vehicleparameter.push(req.body.motorRequestEntity.execution_async);
vehicleparameter.push(req.body.motorRequestEntity.electrical_accessory);
vehicleparameter.push(req.body.motorRequestEntity.non_electrical_accessory);
vehicleparameter.push(req.body.motorRequestEntity.registration_no);
vehicleparameter.push(req.body.motorRequestEntity.is_llpd);
vehicleparameter.push(req.body.motorRequestEntity.is_antitheft_fit);
vehicleparameter.push(req.body.motorRequestEntity.voluntary_deductible);
vehicleparameter.push(req.body.motorRequestEntity.is_external_bifuel);
vehicleparameter.push(req.body.motorRequestEntity.external_bifuel_value);
vehicleparameter.push(req.body.motorRequestEntity.pa_owner_driver_si);
vehicleparameter.push(req.body.motorRequestEntity.pa_named_passenger_si);
vehicleparameter.push(req.body.motorRequestEntity.pa_unnamed_passenger_si);
vehicleparameter.push(req.body.motorRequestEntity.pa_paid_driver_si);
vehicleparameter.push(req.body.motorRequestEntity.vehicle_expected_idv);
vehicleparameter.push(req.body.motorRequestEntity.first_name);
vehicleparameter.push(req.body.motorRequestEntity.middle_name);
vehicleparameter.push(req.body.motorRequestEntity.last_name);
vehicleparameter.push(req.body.motorRequestEntity.mobile);
vehicleparameter.push(req.body.motorRequestEntity.email);
vehicleparameter.push(req.body.motorRequestEntity.crn);
vehicleparameter.push(req.body.motorRequestEntity.ip_address);
vehicleparameter.push(req.body.motorRequestEntity.secret_key);
vehicleparameter.push(req.body.motorRequestEntity.client_key);
vehicleparameter.push(req.body.motorRequestEntity.is_aai_member);
vehicleparameter.push(req.body.motorRequestEntity.external_bifuel_type);
vehicleparameter.push(req.body.motorRequestEntity.ss_id);
vehicleparameter.push(req.body.motorRequestEntity.geo_lat);
vehicleparameter.push(req.body.motorRequestEntity.geo_long);
vehicleparameter.push(req.body.isActive);//
vehicleparameter.push(req.body.SRN);//
vehicleparameter.push(req.body.motorRequestEntity.agent_source);
vehicleparameter.push(req.body.motorRequestEntity.city);

vehicleparameter.push(req.body.motorRequestEntity.app_version);
vehicleparameter.push(req.body.motorRequestEntity.device_id);
vehicleparameter.push(req.body.motorRequestEntity.erp_source);
vehicleparameter.push(req.body.motorRequestEntity.mac_address);
vehicleparameter.push(req.body.insImage);





console.log(vehicleparameter);


con.execute_proc('call Managevehiclerequest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',vehicleparameter,function(data) {
	//res.send(data[0][0]);
	//base.send_response(data);
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		base.send_response("Success", data[0],res);
	}
	else{
			base.send_response("Failure", "",res);				
	}
});

};

var getvehiclerequest = function(req, res, next) {

var vehicleparameter = [];

if(req.body.VehicleRequestID){
	vehicleparameter.push(req.body.VehicleRequestID);	
}
else{
	vehicleparameter.push(null);
}
if(req.body.fba_id){
	vehicleparameter.push(req.body.fba_id);	
}
else{
	vehicleparameter.push(null);
}

if(req.body.product_id == "0"){
	vehicleparameter.push(null);
}
else{
	if(req.body.product_id){
		vehicleparameter.push(req.body.product_id);
	}
	else{
		vehicleparameter.push(null);	
	}
}
if(req.body.crn){
	vehicleparameter.push(req.body.crn);	
}
else{
	vehicleparameter.push(null);
}
if(req.body.first_name){
	vehicleparameter.push(req.body.first_name);	
}
else{
	vehicleparameter.push(null);
}

if(req.body.count){
	vehicleparameter.push(req.body.count);	
}
else{
	vehicleparameter.push(0);
	req.body.count=0;
}

if(req.body.type){
	vehicleparameter.push(req.body.type);	
}
else{
	vehicleparameter.push(0);
	req.body.type=0;
}

console.log("**********************************");
console.log(vehicleparameter);
if(req.body.type == 0){
	con.execute_proc('call GetVehicleRequest(?,?,?,?,?,?,?)',vehicleparameter,function(data) {
		var quoteresponse = [];
		var applicationquote = [];
		for (var i = 0; i < data[0].length; i++) {
			data[0][i].progress_image = "";
			var response ={
				"SRN" : data[0][i].srn,
				"VehicleRequestID" : data[0][i].VehicleRequestID,
				"fba_id" : data[0][i].fba_id,
				"isActive" : data[0][i].isActive,
				"selectedPrevInsID" : data[0][i].selectedPrevInsID,
				"insImage":data[0][i].insImage,
				"motorRequestEntity" : data[0][i]
				
			};
			quoteresponse.push(response);
		}

		for (var i = 0; i < data[1].length; i++) {
			data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
			var response ={
				"SRN" : data[1][i].srn,
				"VehicleRequestID" : data[1][i].VehicleRequestID,
				"fba_id" : data[1][i].fba_id,
				"isActive" : data[1][i].isActive,
				"selectedPrevInsID" : data[1][i].selectedPrevInsID,
				"insImage":data[1][i].insImage,
				"motorRequestEntity" : data[1][i]

			};
			applicationquote.push(response);
		}
		var responsedata = {"quote":quoteresponse,"application":applicationquote};
		base.send_response("Success", responsedata,res);
	});
}
else if(req.body.type == 1)
{
	con.execute_proc('call GetVehicleRequest(?,?,?,?,?,?,?)',vehicleparameter,function(data) {
		var quoteresponse = [];
		var applicationquote = [];
		for (var i = 0; i < data[0].length; i++) {
			data[0][i].progress_image = "";
			var response ={
				"SRN" : data[0][i].srn,
				"VehicleRequestID" : data[0][i].VehicleRequestID,
				"fba_id" : data[0][i].fba_id,
				"isActive" : data[0][i].isActive,
				"selectedPrevInsID" : data[0][i].selectedPrevInsID,
				"insImage":data[0][i].insImage,
				"motorRequestEntity" : data[0][i]
				
			};
			quoteresponse.push(response);
		}
		var responsedata = {"quote":quoteresponse,"application":[]};
		base.send_response("Success", responsedata,res);
	});
	//base.send_response("Failure type not pass",null,res);
}
else if(req.body.type == 2)
{
	con.execute_proc('call GetVehicleRequest(?,?,?,?,?,?,?)',vehicleparameter,function(data) {
		
		var quoteresponse = [];
		var applicationquote = [];
		for (var i = 0; i < data[0].length; i++) {
			data[0][i].progress_image = handler.validateimage(req,data[0][i].StatusPercent);
			var appresponse ={
				"SRN" : data[0][i].srn,
				"VehicleRequestID" : data[0][i].VehicleRequestID,
				"fba_id" : data[0][i].fba_id,
				"isActive" : data[0][i].isActive,
				"selectedPrevInsID" : data[0][i].selectedPrevInsID,
				"insImage":data[0][i].insImage,
				"motorRequestEntity" : data[0][i]
			};
			applicationquote.push(appresponse);
		}
		var responsedata = {"quote":[],"application":applicationquote};
		base.send_response("Success", responsedata,res);
	});
}
else
{
	base.send_response("Failure type not pass",null,res);
}
};

var quotetoapplicationvehicle = function(req, res, next) {

var vehicleparameter = [];

if(req.body.VehicleRequestID){
	vehicleparameter.push(req.body.VehicleRequestID);	
}
else{
	vehicleparameter.push(0);
}
vehicleparameter.push(req.body.selectedPrevInsID);
vehicleparameter.push(req.body.insImage);

// vehicleparameter.push(req.body.crn);

console.log(vehicleparameter);

	con.execute_proc('call QuoteToApplicationVehicle(?,?,?)',vehicleparameter,function(data) {
		console.log(data[0][0]);
		if(data[0][0].SavedStatus=="0"){
			base.send_response("Success", data[0],res);
		}
		else{
			base.send_response("Failure",null,res);
		}
	});
};

var deleteVehicleRequest = function(req, res, next) {

var parameter = [];

if(req.body.VehicleRequestID){
	parameter.push(req.body.VehicleRequestID);	
}
else{
	parameter.push(0);
}

console.log(parameter);

	con.execute_proc('call DeleteVehicleRequest(?)',parameter,function(data) {
		console.log(data[0][0]);
		if(data[0][0].SavedStatus=="0"){
			base.send_response("Success", data[0],res);
		}
		else{
			base.send_response("Failure",null,res);
		}
	});
};

var deactivateVehicleRequest = function(req, res, next) {

  con.execute_proc('call deactivateVehicleRequest()',null,function(data) {
    base.send_response("Success", data,res);
  });
};
var premiumInitiateWrapper=function(req,res,next){
	wrapper('/quote/premium_initiate', 'POST', 
    req.body
  , function(data) {
  		if(data && data.Summary){

  			base.send_response("Success",data.Summary,res);	
  		}else{
  			base.send_response("Failure",null,res);
  		}
  		
  },1);
}
var premiumListDbWrapper=function(req,res,next){
		wrapper('/quote/premium_list_db', 'POST', 
    req.body
  , function(data) {
  		if(data ){

  			base.send_response("Success",data,res);	
  		}else{
  			base.send_response("Failure",null,res);
  		}
  		
  },1);
}

module.exports = {"managevehicle" : managevehicle,"getvehiclerequest" : getvehiclerequest,"quotetoapplicationvehicle":quotetoapplicationvehicle,"deleteVehicleRequest":deleteVehicleRequest,"deactivateVehicleRequest":deactivateVehicleRequest,"premiumInitiateWrapper":premiumInitiateWrapper,"premiumListDbWrapper":premiumListDbWrapper};