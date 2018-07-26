var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var shorturl = function(req, res, next) {

var parameter = [];

  if(req.body.fbaid){
    parameter.push(req.body.fbaid);
    parameter.push(req.body.name);
    parameter.push(req.body.phoneno);

      con.execute_proc('call CreateShortUrl(?,?,?)',parameter,function(data) {
      if(data[0][0].SavedStatus == 0){
        // res.send("hjg");
        base.send_response("Success", data[0],res);
      }
      else{
            base.send_response("Failure", "",res);  
      }
});
  
  }
  else{
     base.send_response("Failure", "",res);  
  }
};


var ShortURLParameter = function(req, res, next) {
    var shorturlpara =[];
    shorturlpara.push(req.body.shorturl);
    con.execute_proc('call GetUrl(?)',shorturlpara,function(rdata) {
        if(rdata != null){
            base.send_response("Success",rdata[0],res);
        }
        else{
              base.send_response("Failure", "",res);  
        }
    });

}

var shorturlforrupeebosstofinmart = function(req, res, next) {

var parameter = [];

  if(req.body.longurl){
    parameter.push(req.body.longurl);
   

      con.execute_proc('call CreateShortUrlForRupeebossToFinmart(?)',parameter,function(data) {
      if(data[0][0].SavedStatus == 0){
        // res.send("hjg");
        base.send_response("Success", data[0],res);
      }
      else{
            base.send_response("Failure", "",res);  
      }
});
  
  }
  else{
     base.send_response("Long url missing", "",res);  
  }
};
module.exports = {"shorturl" :shorturl,"ShortURLParameter":ShortURLParameter,"shorturlforrupeebosstofinmart":shorturlforrupeebosstofinmart}

