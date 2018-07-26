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

      'Authorization': 'key=AAAAS_NxFJ0:APA91bHaDvrs7g_ezcnzlMX-oM21lcR9quuKll2ISo6QwcL1gESfavPUA7sRcnBanttfJjDHaaiWdPQ_ykEyjLKySdKk8Zyll-SN6PnvY--UXWqq8IfFuEYSvkDKoZPsrIEOX-h9D0sD',

      'Sender': '326206821533',

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
    //  console.log(responseString);
    //   console.log("+++++++++++++++++++++++++")
    });



    res.on('end', function() {

      // console.log(hostname);


      var responseObject = "";

      success(responseObject);

    });

  });

  req.write(dataString);

  req.end();

}

module.exports = notificationwrapper;