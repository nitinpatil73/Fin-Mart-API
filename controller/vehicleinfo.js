
var app = require('./wrapper.js');
var response_status = require('./responsestatus');




var getVehicleInfo = function(req, res, next) {
app('/api/VehicleInfo', 'POST', {
    RegistrationNumber: req.body.RegistrationNumber
  }, function(data) {
  	if(data!=null){
	  	response_status.success_response(data,'Success',function (return_data) {
	                          res.send(return_data);
	                });
  	}
  	else{
  		response_status.failure_response(null,'Failure',function (return_data) {
                          res.send(return_data);
                });
  	}
  },1);
}

// router.post('/vehicle-info', function(req, res, next) {
// // console.log(req.body.RegistrationNumber);
// // res.send("asf");



// });

module.exports = getVehicleInfo;