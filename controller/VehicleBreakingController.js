var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var handler = require('./HandlerController');
var wrapper = require('./wrapper.js');

var managevehiclebreakingapi = function(req, res, next) {
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
vehicleparameter.push(req.body.motorRequestEntity.vehicle_insurance_subtype);
vehicleparameter.push(req.body.motorRequestEntity.sub_fba_id);
con.execute_proc('call Breakingvehiclerequest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',vehicleparameter,function(data) {
	if(data[0][0].SavedStatus == "0"){
		SendNotificationAndEmail(data[0][0].VehicleRequestID,res);
		//base.send_response("Success", data[0],res);
	}
	else{
			base.send_response("Failure", "",res);				
	}
});

};

function SendNotificationAndEmail(VehicleRequestID,res){
	wrapper('/api/Send_break_in_mail_n_notification','post',{
		"VehicleRequestID":VehicleRequestID
	},function(responce){
		base.send_response("Thank you for making a request. Currently this request cannot be fulfilled online. Your Relationship Manager will be getting in touch with you shortly to assist.",responce,res);
	},29);
}

module.exports = {"managevehiclebreakingapi" : managevehiclebreakingapi}