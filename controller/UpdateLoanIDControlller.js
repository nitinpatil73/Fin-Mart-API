
var wrapper = require('./wrapper.js');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');


var updateloanid = function (req, res, next) {

wrapper('/LoginDtls.svc/XMLService/updateFBALoanId', 'POST', {
   "fbaid" : req.body.fbaid
  }, function(data) {
    console.log("***************************");
   console.log(data);
    if(data!=null && data.statusId==0){
    	    console.log(data.loanId);
			console.log(req.body.fbaid);

    var loan = [];
	loan.push(req.body.fbaid); //p_FBAID        INT,
	loan.push(data.loanId); 
	con.execute_proc('call UpdateLoanId(?,?)',loan,function(loandata) {
		console.log(loandata);
		 console.log("******############***********");
		 console.log(loandata[0].SavedStatus);
		if(loandata!=null && loandata[0][0].SavedStatus==0){

		    console.log(loandata[0]);
				base.send_response("Loan ID Updated Sucessfully",loandata[0],res);
		}
		else{
			base.send_response(loandata[0][0].Message,null,res);
		}
	});
    }
    else{
    	//Call rupeeboss api with all data to update loan id
        base.send_response("failure",null, res);
    }
  },3);

};

module.exports = {"updateloanid":updateloanid};
