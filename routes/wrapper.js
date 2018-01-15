
"use strict";
var https = require('http');
var wrapper = function(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
      'UserName': 'test',
      'Password': 'test@123'
    };
  }
  var options = {
    host: 'vehicleinfo.policyboss.com',
    path: endpoint,
    method: method,
    headers: headers
  };
  console.log(options);

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      //console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}
module.exports = wrapper;