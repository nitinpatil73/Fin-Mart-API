var express = require('express');
var router = express.Router();
var Cache = require('../model/cache.js');
var con=require('../bin/dbconnection.js');
var base=require('./baseController');
/* GET users listing. */
var getVehicleDetail_Old = function (req, res, next) {
    var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {Product_Id: req.body.ProductId, Product_IdSpecified: true};
    var message = "success";
    base.check_in_cache(req, res, function (data) {
    //    throw new Error('something bad happened');
        if (data)
        {
            base.send_response(message, data, res);
        } else {
            soap.createClient(url, function (err, client) {
                client.GET_Vehicle_Details_Mobile(args, function (err, result) {
                    
                    data = result.GET_Vehicle_Details_MobileResult?result.GET_Vehicle_Details_MobileResult['diffgram']:null;
                    if (data  && result.GET_Vehicle_Details_MobileResult['diffgram'].hasOwnProperty('NewDataSet')) {
                        refine_data = result.GET_Vehicle_Details_MobileResult['diffgram']['NewDataSet']['Table'];
                        //saving data in db
                        var cache_data = new Cache({
                            data: refine_data,
                            product_id: req.body.ProductId
                        });
                        cache_data.save(function (err) {
                            if (err)
                                throw err;
                            message = "cant fetch from source";

                        });
                    }
                    if (data) {
                        refine_data=data['NewDataSet']['Table'];
                        refine_data.forEach(function (arr) {
                            delete arr["attributes"];
                        });
                        base.send_response("success", refine_data, res);
                    } else {
                        base.send_response("cant fetch from source for that product id", data, res);
                    }

                    //console.log(result);
                });
            });
        }


    });
};


var getVehicleDetail=function(req,res,next){
    con.execute_proc('call vehicle_details(?)',req.body.Product_Id,function(data){
        if(data != null && data != '')
        {
            base.send_response("Success",data,res);
        }
        else
        {
            base.send_response("failure",null,res);
        }

    });
};
//router.get('/',function(){
//    cache.say_hi(function(){
//        console.log("baaba");
//    });
//});
module.exports = {"getVehicleDetail_Old":getVehicleDetail_Old,"getVehicleDetail":getVehicleDetail};

