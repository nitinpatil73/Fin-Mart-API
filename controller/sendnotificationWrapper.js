"use strict";

var https = require('http');

//1->vehicleinfo.policyboss.com

//2->qa.policyboss.com

//endpoint /fcm/send

//method :POST

//data : provided in excel

var notificationwrapper = function(endpoint, method, data, success) {

  //var port = "80";

 var hostname = "fcm.googleapis.com";

  var dataString = JSON.stringify(data);

  var headers = {};

  

  if (method == 'post') {

    endpoint += '?' + querystring.stringify(data);

  }

  else {

    headers = {

      'Content-Type': 'application/json',

      'Authorization': 'key=AAAA8LQEaJk:APA91bFCHbV-Agn5pAFEIZlo1I5a1kJT045bSmgzxSPtTt6InH7upheQY_qcepYoMG5XiRgLGWnWPBSkVK0DpTrLo0OgXtylhCUAxSgD_SCof9_xd_E2UhjGrWRNJbFjFjvzWZQnTDPi',

      'Sender': '1033812338841',

      'Cache-Control': 'no-cache'

    };

  }

  var options = {

    host: hostname,

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

      // console.log(responseString);

      var responseObject = JSON.parse(responseString);

      success(responseObject);

    });

  });

  req.write(dataString);

  req.end();

}

module.exports = notificationwrapper;