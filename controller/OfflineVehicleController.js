var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var handler = require('./HandlerController');
var wrapper = require('./wrapper.js');
var managevehicleoffline = function(req, res, next) {

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
vehicleparameter.push(req.body.comment);
vehicleparameter.push(req.body.motorRequestEntity.usage);
vehicleparameter.push(req.body.motorRequestEntity.grossvehicleweight);
vehicleparameter.push(req.body.motorRequestEntity.seatingcapacity);
vehicleparameter.push(req.body.motorRequestEntity.modeloffline);
vehicleparameter.push(req.body.motorRequestEntity.fueloffline);
vehicleparameter.push(req.body.motorRequestEntity.varientoffline);
vehicleparameter.push(req.body.idvAmount);




con.execute_proc('call Managevehiclerequestoffline(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',vehicleparameter,function(data) {
	//res.send(data[0][0]);
	//base.send_response(data);
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		console.log(data[1].length);
		for (var i = 0; i < data[1].length; i++) {
			var docpath="";
			var id="";
			for (var j = 0; j < data[2].length; j++) {
				if(data[1][i].docname==data[2][j].Document_name){
					docpath = data[2][j].document_path;
					id = data[2][j].id;
				}				
				data[1][i].docpath= docpath;
				//data[1][i].id= id;
			}			
		}
		console.log(data[1]);
		///data[0].document = data[1];
		var newresponse={
			"TransId" : data[0][0].TransId,
			"RequestId" : data[0][0].RequestId,
			"SavedStatus" : data[0][0].SavedStatus,
			"Document" : data[1]
		};
		console.log(newresponse);
		base.send_response("Success", newresponse,res);		
	}
	else{
		base.send_response("Failure", "",res);				
	}
});

};


var getvehiclerequestoffline = function(req, res, next) {

	var vehicleparameter = [];
	if(req.body.fba_id){
		vehicleparameter.push(req.body.fba_id);
		vehicleparameter.push(req.body.count);
		vehicleparameter.push(req.body.product_id);
		con.execute_proc('call GetVehicleRequestOfflineQuote(?,?,?)',vehicleparameter,function(data) {	
	
			var quoteresponse = [];		
			for (var i = 0; i < data[0].length; i++) {
				var quote = [];	

				for (var j = 0; j < data[1].length; j++) {	
					//console.log(data[1][j].TranId);				
					if(data[1][j].TranId == data[0][i].TransId){
						 // console.log(data[1][j].TransId);
						 // console.log(data[0][i].TranId);
						quote.push(data[1][j]);
					}
				}
				data[0][i].progress_image = "";
				//data[0][i].quote = quote;
				var response ={
					// "SRN" : data[0][i].srn,
					// "VehicleRequestID" : data[0][i].VehicleRequestID,
					// "fba_id" : data[0][i].fba_id,
					// "isActive" : data[0][i].isActive,
					// "selectedPrevInsID" : data[0][i].selectedPrevInsID,
					// "insImage":data[0][i].insImage,
					// "comment":data[0][i].comment,
					// "idvAmount":data[0][i].idvAmount,
					// "quote" : [{"motorRequestEntity" : data[0][i]}]			
					// //"motorRequestEntity" : data[0][i]


					"SRN" : data[0][i].srn,
					"VehicleRequestID" : data[0][i].VehicleRequestID,
					"fba_id" : data[0][i].fba_id,
					"isActive" : data[0][i].isActive,
					"selectedPrevInsID" : data[0][i].selectedPrevInsID,
					"insImage":data[0][i].insImage,
					"quote" : quote,
					"comment":data[0][i].comment,
					"idvAmount":data[0][i].idvAmount,
					//"quote" : [{"motorRequestEntity" : data[0][i]}]
					"motorRequestEntity" : data[0][i]
				};

				
				quoteresponse.push(response);
				
			}
			base.send_response("Success", quoteresponse,res);
	});
	}
	else{
		base.send_response("FBAID not passed", "",res);		
	}
};



module.exports = {"managevehicleoffline" : managevehicleoffline,"getvehiclerequestoffline":getvehiclerequestoffline};
