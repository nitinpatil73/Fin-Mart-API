var con=require('../bin/dbconnection.js');
var base = require('./baseController');


var managevehicle = function(req, res, next) {

var vehicleparameter = [];

if(req.body.VehicleRequestID){
	vehicleparameter.push(req.body.VehicleRequestID);	
}
else{
	vehicleparameter.push(null);
}
//vehicleparameter.push(req.body.VehicleRequestID);
vehicleparameter.push(req.body.birth_date);
vehicleparameter.push(req.body.fba_id);
vehicleparameter.push(req.body.product_id);
vehicleparameter.push(req.body.vehicle_id);
vehicleparameter.push(req.body.rto_id);
vehicleparameter.push(req.body.vehicle_insurance_type);
vehicleparameter.push(req.body.vehicle_manf_date);
vehicleparameter.push(req.body.vehicle_registration_date);
vehicleparameter.push(req.body.policy_expiry_date);
vehicleparameter.push(req.body.prev_insurer_id);
vehicleparameter.push(req.body.vehicle_registration_type);
vehicleparameter.push(req.body.vehicle_ncb_current);
vehicleparameter.push(req.body.is_claim_exists);
vehicleparameter.push(req.body.method_type);
vehicleparameter.push(req.body.execution_async);
vehicleparameter.push(req.body.electrical_accessory);
vehicleparameter.push(req.body.non_electrical_accessory);
vehicleparameter.push(req.body.registration_no);
vehicleparameter.push(req.body.is_llpd);
vehicleparameter.push(req.body.is_antitheft_fit);
vehicleparameter.push(req.body.voluntary_deductible);
vehicleparameter.push(req.body.is_external_bifuel);
vehicleparameter.push(req.body.external_bifuel_value);
vehicleparameter.push(req.body.pa_owner_driver_si);
vehicleparameter.push(req.body.pa_named_passenger_si);
vehicleparameter.push(req.body.pa_unnamed_passenger_si);
vehicleparameter.push(req.body.pa_paid_driver_si);
vehicleparameter.push(req.body.vehicle_expected_idv);
vehicleparameter.push(req.body.first_name);
vehicleparameter.push(req.body.middle_name);
vehicleparameter.push(req.body.last_name);
vehicleparameter.push(req.body.mobile);
vehicleparameter.push(req.body.email);
vehicleparameter.push(req.body.crn);
vehicleparameter.push(req.body.ip_address);
vehicleparameter.push(req.body.secret_key);
vehicleparameter.push(req.body.client_key);
vehicleparameter.push(req.body.is_aai_member);
vehicleparameter.push(req.body.external_bifuel_type);
vehicleparameter.push(req.body.ss_id);
vehicleparameter.push(req.body.geo_lat);
vehicleparameter.push(req.body.geo_long);
vehicleparameter.push(req.body.isActive);




console.log(vehicleparameter);

// 44
con.execute_proc('call Managevehiclerequest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',vehicleparameter,function(data) {
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
if(req.body.product_id){
	vehicleparameter.push(req.body.product_id);	
}
else{
	vehicleparameter.push(null);
}
if(req.body.crn){
	vehicleparameter.push(req.body.crn);	
}
else{
	vehicleparameter.push(null);
}
console.log(vehicleparameter);

	con.execute_proc('call GetVehicleRequest(?,?,?,?)',vehicleparameter,function(data) {
		var responsedata = {"quote":data[0],"application":data[1]};
		base.send_response("Success", responsedata,res);
		// if(data[0].length>0){
		// 	base.send_response("Success", data[0],res);
		// }
		// else{
		// 	base.send_response("Failure",null,res);
		// }
	});
};

var quotetoapplicationvehicle = function(req, res, next) {

var vehicleparameter = [];

if(req.body.VehicleRequestID){
	vehicleparameter.push(req.body.VehicleRequestID);	
}
else{
	vehicleparameter.push(0);
}

console.log(vehicleparameter);

	con.execute_proc('call QuoteToApplicationVehicle(?)',vehicleparameter,function(data) {
		console.log(data[0][0]);
		if(data[0][0].SavedStatus=="0"){
			base.send_response("Success", data[0],res);
		}
		else{
			base.send_response("Failure",null,res);
		}
	});
};


module.exports = {"managevehicle" : managevehicle,"getvehiclerequest" : getvehiclerequest,"quotetoapplicationvehicle":quotetoapplicationvehicle};