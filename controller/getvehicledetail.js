var express = require('express');
var router = express.Router();
var Cache = require('../model/cache.js');
var base=require('./baseController');
/* GET users listing. */
var getVehicleDetail = function (req, res, next) {
    var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {Product_Id: req.body.ProductId, Product_IdSpecified: true};
    base.check_in_cache(req, res, function (data) {

        if (data)
        {
            base.send_response(data, res);
        } else {
            soap.createClient(url, function (err, client) {
                client.GET_Vehicle_Details_Mobile(args, function (err, result) {
                    data = result.GET_Vehicle_Details_MobileResult['diffgram']['NewDataSet']['Table'];
                    if (result.GET_Vehicle_Details_MobileResult['diffgram'].hasOwnProperty('NewDataSet')) {
                        //saving data in db
                        var cache_data = new Cache({
                            data: data,
                            product_id: req.body.ProductId
                        });
                        cache_data.save(function (err) {
                            if (err)
                                throw err;
                            console.log('from API');
                        });
                        data.forEach(function (arr) {
                            delete arr["attributes"];
                        });

                    }

                    base.send_response(data, res);

                    //console.log(result);
                });
            });
        }


    });
};

//router.get('/',function(){
//    cache.say_hi(function(){
//        console.log("baaba");
//    });
//});
module.exports = getVehicleDetail;

