
var app = require('./wrapper.js');
// var response_status = require('./responsestatus');
var base=require('./baseController');



var getVehicleInfo = function(req, res, next) {
app('/quote/vehicle_info', 'POST', {
    RegistrationNumber: req.body.RegistrationNumber,
    client_key : "CLIENT-GLF2SRA5-CFIF-4X2T-HC1Z-CXV4ZWQTFQ3T",
	secret_key : "SECRET-ODARQ6JP-9V2Q-7BIM-0NNM-DNRTXRWMRTAL"
  }, function(data) {
   // console.log(data);
  	if(data!=null){
	  	base.send_response("success",data, res);
  	}
  	else{
  		base.send_response("failure",data, res);
  	}
  },9);
}

// router.post('/vehicle-info', function(req, res, next) {
// // console.log(req.body.RegistrationNumber);
// // res.send("asf");



// });

module.exports = getVehicleInfo;