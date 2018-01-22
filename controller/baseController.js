var Cache = require('../model/cache.js');
class BaseController{};
BaseController.send_response = function (message,data, res, next) {
    if(data && data.hasOwnProperty('ExceptionMessage')){
        Message = "Source Error : " +data.ExceptionMessage;
        Status = "failure";
        StatusNo = 1;
        MasterData = null;
    }else{  
        if (data) {
            Message = message;
            Status = "success";
            StatusNo = 0;
            MasterData = data;
        } else {
            Message = message;
            Status = "failure";
            StatusNo = 1;
            MasterData = data;
        }
    }
response = {Message: Message, Status: Status, StatusNo: StatusNo, MasterData: MasterData};
    //console.log(response)
    res.send(response);
};
BaseController.check_in_cache = function (req, res, callback) {
    Cache.findOne({product_id: req.body.ProductId}, {}, {sort: {'updatedAt': -1}}, function (err, post) {
        //try{
            if (err)
            throw err;
        curr_date = new Date();
        if(!post)return (callback(null));
        last_update = post.updatedAt;
        BaseController.get_date_difference(last_update, curr_date, function (result) {
            if (err) {
                callback(null);
                throw err;
            }
            if (result === true) {
                callback(null);
            } else {
                console.log("from mongo");
                callback(post['data']);
            }
        });
//    }catch(e){
//        throw e;
//        callback(null);
//    }
    });
};
BaseController.get_date_difference = function (d1, d2, callback) {
    var divideBy = { w:604800000,d:86400000,h:3600000,m:60000,s:1000 };
    //change m to d in for 1 day checck
    var diff = (d2 - d1)/divideBy['m'];
    if (diff > 1)
    {
        callback(true);
    } else {
        callback(false);
    }
};


module.exports=BaseController;

