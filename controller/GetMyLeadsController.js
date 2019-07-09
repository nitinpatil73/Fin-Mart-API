var app = require('./wrapper.js');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');

var getmyleads = function(req, res, next) {
app('/quote/vehicle_info', 'POST', {
    RegistrationNumber: req.body.RegNo,
    client_key : "CLIENT-GLF2SRA5-CFIF-4X2T-HC1Z-CXV4ZWQTFQ3T",
    secret_key : "SECRET-ODARQ6JP-9V2Q-7BIM-0NNM-DNRTXRWMRTAL"
  }, function(data) {
    console.log("-------------fas----------------");
    console.log(data);
    var regno = data.Registration_Number;
    var var_id = data.Variant_Id;
    var rto_no_data = data.RTO_Code;
    con.execute_proc('call get_vehicle_id_depends_lead_id(?)',req.body.LeadId,function(data) {
    var varvehicleparaid;
    if(data[0][0].id != '0'){
       varvehicleparaid = data[0][0].VehicleRequestID;
    }else{
       varvehicleparaid = "0";
    }
   var resdata = { "SRN": "",
                "VehicleRequestID": varvehicleparaid,
                "LeadId":req.body.LeadId,
                "fba_id": req.body.FBAID,
                "isActive": "1",
                "selectedPrevInsID": "0",
                "insImage": "",
                "motorRequestEntity": {
                    "VehicleRequestID": varvehicleparaid,
                    "birth_date": null,
                    "fba_id": req.body.FBAID,
                    "product_id": "1",
                    "vehicle_id": var_id,
                    "rto_id": rto_no_data,
                    "vehicle_insurance_type": "renew",
                    "vehicle_manf_date": "",
                    "vehicle_registration_date": "",
                    "policy_expiry_date": "",
                    "prev_insurer_id": "0",
                    "vehicle_registration_type": "individual",
                    "vehicle_ncb_current": "0",
                    "is_claim_exists": "yes",
                    "method_type": "Premium",
                    "execution_async": "yes",
                    "electrical_accessory": "0",
                    "non_electrical_accessory": "0",
                    "registration_no": regno,
                    "is_llpd": "no",
                    "is_antitheft_fit": "no",
                    "voluntary_deductible": "0",
                    "is_external_bifuel": "no",
                    "external_bifuel_value": "0",
                    "pa_owner_driver_si": "1500000",
                    "pa_named_passenger_si": "0",
                    "pa_unnamed_passenger_si": "0",
                    "pa_paid_driver_si": "",
                    "vehicle_expected_idv": "0",
                    "first_name": req.body.Name,
                    "middle_name": "",
                    "last_name": "",
                    "mobile": "",
                    "email": "",
                    "crn": "",
                    "ip_address": "",
                    "secret_key": "",
                    "client_key": "",
                    "is_aai_member": "no",
                    "external_bifuel_type": "",
                    "ss_id": req.body.ss_id,
                    "geo_lat": "19.0858715",
                    "geo_long": "72.8882537",
                    "isTwentyfour": 1,
                    "isActive": "1",
                    "created_date": "",
                    "type": "",
                    "conversiondate": "",
                    "srn": "",
                    "agent_source": "",
                    "selectedPrevInsID": "0",
                    "PBStatus": "",
                    "PBStatusDesc": "",
                    "StatusPercent": "0",
                    "app_version": "2.2.2",
                    "device_id": "",
                    "erp_source": "",
                    "mac_address": "",
                    "insImage": "",
                    "varid": var_id,
                    "vehicle_insurance_subtype": "",
                    "sendmobileno": "",
                    "sendmessage": "",
                    "sub_fba_id": "",
                    "is_policy_exist": "",
                    "is_breakin": "",
                    "progress_image": ""
                }};
        if(data!=null){
            base.send_response("success",resdata, res);
        }
        else{
            base.send_response("failure",data, res);
        }
    }); 
  },9);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day  ].join('-');
}


var getmyleadsview = function(req, res, next) {
     var vehicleparameter = [];
     vehicleparameter.push(req.body.VehicleRequestID);  
     vehicleparameter.push(req.body.LeadId); 
    con.execute_proc('call GetMyLeadDataView(?,?)',vehicleparameter,function(data) {
        console.log("-----------------1-------------------------");
        console.log(data);
        if(data[0][0].id != "0"){
                var response ={
                    "SRN" : data[0][0].srn,
                    "VehicleRequestID" : data[0][0].VehicleRequestID,
                    "fba_id" : data[0][0].fba_id,
                    "isActive" : data[0][0].isActive,
                    "selectedPrevInsID" : data[0][0].selectedPrevInsID,
                    "insImage":data[0][0].insImage,
                    "motorRequestEntity" : data[0][0]
                    
                };
            base.send_response("Success", response,res);
        }else{
            base.send_response("Record does not find",null,res);
        }
                
    });
};

module.exports = {"getmyleads":getmyleads,"getmyleadsview":getmyleadsview};