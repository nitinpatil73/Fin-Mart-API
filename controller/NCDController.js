var con=require('../bin/dbconnection.js');
var base = require('./baseController');


var getNCDProduct = function(req, res, next) {
    var fba_req_id = [];
    fba_req_id.push(req.body.fbaid);
con.execute_proc('call getNCDProduct(?)',fba_req_id,function(data) {
  
	 if(data != null && data != '')
        {
        	 if(data[0][0] != null && data[0][0] != ''){
                if(process.env.NODE_ENV == 'development'){
                    data[0][0].bannerimage = "http://bo.mgfm.in/ncd/"+data[0][0].bannerimage;
                }
                else{
                    data[0][0].bannerimage = "http://bo.magicfinmart.com/ncd/"+data[0][0].bannerimage;
                } 
                    var newresponse = data[0][0];
                    for (var i = 0; i < data[1].length; i++) {
                       if(data[1][i].documenttype!='html'){
                        if(process.env.NODE_ENV == 'development'){
                            data[1][i].documentpath = "http://bo.mgfm.in/ncd/"+data[1][i].documentpath;
                        }
                        else{
                            data[1][i].documentpath = "http://bo.magicfinmart.com/ncd/"+data[1][i].documentpath;
                        }                                                    
                    }
                }
                newresponse.document = data[1];                
				base.send_response("Success",newresponse,res);
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


var insertncddetails = function(req, res, next) {
    var ncddetails = [];
    ncddetails.push(req.body.campaignid);
    ncddetails.push(req.body.fbaid);
    ncddetails.push(req.body.customername);
    ncddetails.push(req.body.referenceno);
    ncddetails.push(req.body.guid);
con.execute_proc('call insertncddetails(?,?,?,?,?)',ncddetails,function(data) {
  
	 if(data != null && data != '')
        {
            //console.log(data[0][0].SavedStatus);
        	 if(data[0][0].SavedStatus == 0){
				base.send_response(data[0][0].Message,data[0][0],res);
        	 }
        	 else{
        	 		base.send_response(data[0][0].Message,null,res);
        	 }            
        }
        else
        {
            base.send_response("failure",null,res);
        }
	});
};

module.exports = {"getNCDProduct":getNCDProduct,"insertncddetails":insertncddetails};