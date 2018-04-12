
var wrapper = require('./wrapper.js');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');


var updateloanid = function (req, res, next) {

wrapper('/LoginDtls.svc/XMLService/updateFBALoanId', 'POST', {
   "fbaid" : req.body.fbaid
  }, function(data) {
   
    if(data!=null && data.statusId==0){
    	    console.log(data.loanId);
			console.log(req.body.fbaid);

    var loan = [];
	loan.push(req.body.fbaid); //p_FBAID        INT,
	loan.push(data.loanId); 
	con.execute_proc('call UpdateLoanId(?,?)',loan,function(loandata) {
		console.log(loandata);
		    // console.log("******############***********");
		    // console.log(loandata[0]);
		if(loandata!=null && loandata[0].SavedStatus==0){
				base.send_response("Loan ID Updated Sucessfully",loandata[0],res);
		}
		else{
			base.send_response(loandata[0][0].Message,null,res);
		}
	});
    }
    else{
    	GetFBAData(req.body.fbaid,req, res, next);
       base.send_response("failure",null, res);
    }
  },3);

};


function GetFBAData(FBAID,req, res, next) {
   console.log("***************************");
   console.log(FBAID);
	con.execute_proc('call GetLoanFBAData(?)',FBAID,function(fbadata) {
		if(fbadata != null)
		{
			base.send_response("Success",fbadata[0],res);
		}
		else
		{
			base.send_response("failure",null, res);
		}

	});
}
module.exports = {"updateloanid":updateloanid};
