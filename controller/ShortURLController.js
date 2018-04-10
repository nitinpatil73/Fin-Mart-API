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

module.exports = {"shorturl" :shorturl}