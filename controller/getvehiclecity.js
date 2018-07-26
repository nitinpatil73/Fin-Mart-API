// var express = require('express');
// var router = express.Router();
// var response_status = require('./responsestatus');
var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var Get_Vechicle_city_Old = function(req, res, next) {
  var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {};
    soap.createClient(url, function(err, client) {
          client.Get_Vechical_city(args, function(err, result) {
           // res.send(result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical']);
           data = result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical'];
           if(data.length>0){
               data.forEach(function (arr) {
                            delete arr["attributes"];
                        });
              base.send_response("success",data, res);
            }
            else{
               base.send_response("failure",data, res);
            }
          });
});
};

var Get_Vechical_City = function(req,res,next)
{
  con.execute_proc('call Get_RTO_Master()',null,function(data){
    if(data != null && data != '')
    {
        base.send_response("Success",data[0],res);
    }
    else
    {
        base.send_response("Failure",null,res);
    }

  });
};
module.exports ={"Get_Vechicle_city_Old":Get_Vechicle_city_Old,"Get_Vechical_City":Get_Vechical_City};

/*router.get('/Get_Vechical_city', function(req, res, next) {
    var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {};
    soap.createClient(url, function(err, client) {
          client.Get_Vechical_city(args, function(err, result) {
           // res.send(result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical']);
           data = result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical'];
           if(data.length>0){
                response_status.success_response(data,'Success',function (return_data) {
                          res.send(return_data);
                });
            }
            else{
                 response_status.failure_response(null,'Failure',function (return_data) {
                          res.send(return_data);
                });
            }
          });
});
});*/

//module.exports = router;
