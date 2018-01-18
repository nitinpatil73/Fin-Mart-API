var express = require('express');
var router = express.Router();
var Cache = require('../model/cache.js');
/* GET users listing. */
var getVehicleDetail = function (req, res, next) {
    var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {Product_Id: req.body.ProductId, Product_IdSpecified: true};
    check_in_cache(req, res, function (data) {

        if (data)
        {
            send_response(data, res);
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
                            console.log('Data saved successfully!');
                        });
                        data.forEach(function (arr) {
                            delete arr["attributes"];
                        });

                    }

                    send_response(data, res);

                    //console.log(result);
                });
            });
        }


    });
};
var check_in_cache = function (req, res, callback) {
    Cache.findOne({product_id: req.body.ProductId}, {}, {sort: {'updatedAt': -1}}, function (err, post) {
        if (err)
            throw err;
        curr_date = new Date();
        last_update = post.updatedAt;
        get_date_difference(last_update, curr_date, function (result) {
            if (err) {
                callback(null);
                throw err;
            }
            if (result === true) {
                callback(null);
            } else {
                callback(post['data']);
            }
        });
    });
};
var get_date_difference = function (d1, d2, callback) {
    var diff = d2 - d1;
    if (diff > 60e3)
    {
        console.log(Math.floor(diff / 60e3), 'minutes ago');
        callback(true);
    } else {
        console.log(Math.floor(diff / 1e3), 'minutes ago');
        callback(false);
    }
};
var send_response = function (data, res, callback) {
    if (data) {
        Message = "Success";
        Status = "success";
        StatusNo = 0;
        DataCount = data.length;
        MasterData = data;
    } else {
        Message = "Failure";
        Status = "failure";
        StatusNo = 1;
        DataCount = 0;
        MasterData = data;
    }
    response = {Message: Message, Status: Status, StatusNo: StatusNo, DataCount: DataCount, MasterData: MasterData};
    res.send(response);
};
//router.get('/',function(){
//    cache.say_hi(function(){
//        console.log("baaba");
//    });
//});
module.exports = getVehicleDetail;
;
