var express = require('express');
var router = express.Router();
var app = require('./wrapper.js');


router.post('/vehicle-info', function(req, res, next) {
// console.log(req.body.RegistrationNumber);
// res.send("asf");


app('/api/VehicleInfo', 'POST', {
    RegistrationNumber: req.body.RegistrationNumber
  }, function(data) {
    res.send(data);
  });
});


//   app('/api/VehicleInfo', 'POST', {
//     RegistrationNumber: 'GJ01RJ3447'
//   }, function(data) {
//     res.send(data);
//   });
// });

module.exports = router;