var express = require('express');
var router = express.Router();
var Cache = require('../model/cache.js');
/* GET users listing. */
router.post('/getVehicleDetail', function(req, res, next) {
    var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {Product_Id:req.body.ProductId,Product_IdSpecified:true};
    soap.createClient(url, function(err, client) {
          client.GET_Vehicle_Details_Mobile(args, function(err, result) {
           data = result.GET_Vehicle_Details_MobileResult['diffgram']['NewDataSet']['Table'];
            if(result.GET_Vehicle_Details_MobileResult['diffgram'].hasOwnProperty('NewDataSet')){
                    //saving data in db
                    var cache_data=new Cache({
                       data:data 
                    });
                    cache_data.save(function(err) {
                    if (err) throw err;

                        console.log('Data saved successfully!');
                      });
                    
                    data.forEach(function(arr){
                       delete arr["attributes"] ;
                       
                    });
                    Message= "Success";
                    Status="success";
                    StatusNo= 0;
                    DataCount= data.length;
                    MasterData=data;          
                }
               else{
                    Message= "Failure";
                    Status="failure";
                    StatusNo= 1;
                    DataCount= 0;
                    MasterData=data;
               }
          
              response={Message:Message,Status:Status,StatusNo:StatusNo,DataCount:DataCount,MasterData:MasterData};
              res.send(response);
              //console.log(result);
          });
});
});
//router.get('/',function(){
//    cache.say_hi(function(){
//        console.log("baaba");
//    });
//});
module.exports = router;
