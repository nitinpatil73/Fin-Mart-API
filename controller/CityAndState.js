var con=require('../bin/dbconnection.js');
var base=require('./baseController');
class CityAndState{};
CityAndState.getCityAndState = function(req, res, next) {
    var pin=req.body.PinCode;
    query="call usp_load_pincodewise_detail(?)";
    con.execute_proc(query,[pin],function(data){
       // console.log(JSON.stringify(data));
        if(data.length>0 & data[0].length>0){
            base.send_response("success",data[0][0],res);
        }else{
            base.send_response("Failure",null,res);
        }
    });
};
module.exports=CityAndState;