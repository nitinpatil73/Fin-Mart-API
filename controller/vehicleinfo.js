
var app = require('./wrapper.js');
// var response_status = require('./responsestatus');
var base=require('./baseController');



var getVehicleInfo = function(req, res, next) {
app('/api/VehicleInfo', 'POST', {
    RegistrationNumber: req.body.RegistrationNumber
  }, function(data) {
  	if(data!=null){
	  	base.send_response("success",data, res);
  	}
  	else{
  		base.send_response("failure",data, res);
  	}
  },1);
}

// router.post('/vehicle-info', function(req, res, next) {
// // console.log(req.body.RegistrationNumber);
// // res.send("asf");



// });

module.exports = getVehicleInfo;