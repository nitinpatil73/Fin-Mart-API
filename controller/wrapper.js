"use strict";
var https =require('follow-redirects').http;
//1->vehicleinfo.policyboss.com
//2->qa.policyboss.com
var wrapper = function(endpoint, method, data, success,hosttype) {
  var hostname = "";
  var port = "80";
  var username = "test";
  var password = "test@123";
  if (hosttype == 1) {
    //hostname = "vehicleinfo.policyboss.com";
    hostname = "qa-horizon.policyboss.com";
    port = 3000;
  }
else if(hosttype == 2) {
    if(process.env.NODE_ENV == 'development'){
        
        //hostname = "qa.policyboss.com";
         hostname = "vehicleinfo.policyboss.com";
          username = "Datacomp";
         password = "dc@pb123";
    }
    else{
        hostname = "vehicleinfo.policyboss.com";
    } 
  }
   else if(hosttype == 3) {

    
    if(process.env.NODE_ENV == 'development'){
        port = 8063;
        hostname = "erp.rupeeboss.com";
    }
    else{
        hostname = "beta.services.rupeeboss.com";
    }

    
  }
  else if(hosttype == 4) {
    hostname = "services.rupeeboss.com";
  }
   else if(hosttype == 5) {
    hostname = "finmartwebapi.magicsales.in";
  }
  else if(hosttype == 6) {
    if(process.env.NODE_ENV == 'development'){
       hostname = "api.rupeeboss.com";
  }
  else{
       hostname = "api.rupeeboss.com";
  }
  
  }else if(hosttype==7){
    hostname="http://vas.mobilogi.com";
  }
else if(hosttype == 8) {
    hostname = "demo.fundzmagiconline.com";
    //hostname = "http://wmdataservice.wealthmagicuat.in";
  }
  else if(hosttype == 9) {
    hostname = "horizon.policyboss.com";
    port = "5000";      
  }
  else if(hosttype == 10) {
    hostname = "zohowebapi.magicsales.in";
  }
else if(hosttype == 11) {
    hostname = "qa.policyboss.com";
  }
  else if(hosttype == 12) {
    // port="80";
    hostname = "www.rupeeboss.com";
  }

   else if(hosttype == 13) {
    // port="80";
    hostname = "apiservices.magicfinmart.com";
  }

  else if(hosttype == 14) {
    // port="80";
    hostname = "api.magicfinmart.com";
  }
  else if(hosttype == 15) {
    hostname = "finmartwebapi.magicsales.in";
  }
  var dataString = JSON.stringify(data);
  console.log("*******************************");
  if(hosttype == 15){
     dataString =encodeURIComponent(dataString); 
     console.log(encodeURIComponent(dataString));
}
  //console.log(encodeURIComponent(dataString));
  var headers = {};
  
  if (method == 'GET') {
    //endpoint += '?' + JSON.stringify(data);
    //console.log(endpoint);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
      'UserName': username,
      'Password': password,
      'token': '1234567890'
    };
  }
  var options = {
    host: hostname,
    port : port,
    path: endpoint,
    method: method,
    headers: headers
  };
  console.log("---------*******------------wrapper--------------**********---------------");
  console.log(options);

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