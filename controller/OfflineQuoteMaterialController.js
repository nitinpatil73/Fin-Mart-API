var con=require('../bin/dbconnection.js');
var base = require('./baseController');



var getOfflineQuoteMaterial = function(req, res, next) {
con.execute_proc('call getOfflineQuoteMaterial()',[],function(data) {
     if(data != null && data != '')
        {
             if(data[0][0] != null && data[0][0] != ''){
                var final={};
                final.quotematerail=data[0];
                final.quotedoc=data[1];
                    base.send_response("Success",final,res);
                }
             
             else{
                    base.send_response("failure",null,res);
             }            
        }
        else
        {
            base.send_response("failure",null,res);
        }
    });
};
module.exports = {"getOfflineQuoteMaterial":getOfflineQuoteMaterial};