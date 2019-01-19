var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var app = require('./wrapper.js');

var PremiumParameter = function (req, res, next) {
           app('/quote/premium_initiate', 'POST', {
             "product_id":10,
             "vehicle_id":"8",
             "Variant_ID":"8",
             "rto_id":"580",
             "vehicle_insurance_type":"",
             "vehicle_manf_date":"2017-10-12",
             "vehicle_registration_date":"2017-12-13",
             "policy_expiry_date":"2019-12-12",
             "prev_insurer_id":2,
             "vehicle_registration_type":"individual",
             "vehicle_ncb_current":"0",
             "is_claim_exists":"yes",
             "birth_date":"",
             "method_type":"Premium",
             "execution_async":"yes",
             "registration_no":"MH-01-CX-8564",
             "electrical_accessory":"0",
             "non_electrical_accessory":"0",
             "voluntary_deductible":"0",
             "is_llpd":"no",
             "is_antitheft_fit":"no",
             "is_external_bifuel":"no",
             "first_name":"vivek",
             "last_name":"panhalekar",
             "middle_name":"",
             "external_bifuel_value":"0",
             "pa_owner_driver_si":"100000",
             "pa_named_passenger_si":"",
             "pa_unnamed_passenger_si":"0",
             "pa_paid_driver_si":"0",
             "vehicle_expected_idv":"0",
             "mobile":"8097510672",
             "email":"finmarttest@gmail.com",
             "crn":"170842",
             "secret_key":"SECRET-VG9N6EVV-MIK3-1GFC-ZRBV-PE7XIQ8DV4GY",
             "client_key":"CLIENT-WF4GWODI-HMEB-Q7M6-CLES-DEJCRF7XLRVI",
             "ss_id":"0",
             "ip_address":"",
             "mac_address":"",
             "device_id":"",
             "fba_id":35847
            }, function(data) {
                if(data!=null){
                    base.send_response("Success",data[0],res); 
                }
                else{
                    base.send_response("Failure", null,res);    
                } 
            },9);
};

module.exports = {
"PremiumParameter":PremiumParameter,
};