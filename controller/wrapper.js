"use strict";
var https = require('http');
//1->vehicleinfo.policyboss.com
//2->qa.policyboss.com
var wrapper = function(endpoint, method, data, success,hosttype) {
  var hostname = "";
  var port = "80";
  if (hosttype == 1) {
    //hostname = "vehicleinfo.policyboss.com";
    hostname = "qa-horizon.policyboss.com";
    port = 3000;
  } else if(hosttype == 2) {
    hostname = "qa.policyboss.com";
  }
  else if(hosttype == 3) {
    hostname = "beta.services.rupeeboss.com";
  }
  else if(hosttype == 4) {
    hostname = "services.rupeeboss.com";
  }
   else if(hosttype == 5) {
    hostname = "finmartwebapi.magicsales.in";
  }
  else if(hosttype == 6) {
    hostname = "api.rupeeboss.com";
  
  }else if(hosttype==7){
    hostname="http://vas.mobilogi.com";
  }
else if(hosttype == 8) {
    hostname = "demo.fundzmagiconline.com";
  }
  else if(hosttype == 9) {
    hostname = "http://horizon.policyboss.com:5000";
  }
  else if(hosttype == 10) {
    hostname = "zohowebapi.magicsales.in";
  }
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    //endpoint += '?' + JSON.stringify(data);
    //console.log(endpoint);
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
    host: hostname,
    port : port,
    path: endpoint,
    method: method,
    headers: headers
  };
  //console.log(options);

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      // console.log(hostname);
       console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });
  req.write(dataString);
  req.end();
}
module.exports = wrapper;