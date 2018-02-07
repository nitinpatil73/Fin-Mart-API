var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var BalanceTransfer = function(req, res, next) {

var BalanceTransferparameter = [];

  if(req.body.BalanceTransferId){
    	BalanceTransferparameter.push(req.body.BalanceTransferId); 
  }
  else{
   		BalanceTransferparameter.push(0);
  }
BalanceTransferparameter.push(req.body.ApplicantName);
BalanceTransferparameter.push(req.body.loanamount);
BalanceTransferparameter.push(req.body.loaninterest);
BalanceTransferparameter.push(req.body.loanterm);
BalanceTransferparameter.push(req.body.LoanType);
BalanceTransferparameter.push(req.body.product_id);
BalanceTransferparameter.push(req.body.fbaid);
BalanceTransferparameter.push(req.body.LoanID);	//
console.log(BalanceTransferparameter);

con.execute_proc('call ManageBalanceTransfer(?,?,?,?,?,?,?,?,?)',BalanceTransferparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == 0){
		// res.send("hjg");
		base.send_response("Success", data[0][0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});

};

var SetQuoteApplicationBalanceTransfer = function(req, res, next) {

var sqapplibalancetransferparameter = [];
sqapplibalancetransferparameter.push(req.body.BalanceTransferId);	//
console.log(sqapplibalancetransferparameter);


con.execute_proc('call SetQuoteApplicationBalanceTransfer(?)',sqapplibalancetransferparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		base.send_response("Success", data[0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});

};

var DeleteBalanceTransfer = function(req, res, next) {

var DeleteBalanceTransferparameter = [];
DeleteBalanceTransferparameter.push(req.body.BalanceTransferId);	//
console.log(DeleteBalanceTransferparameter);


con.execute_proc('call deletebalancetransfer(?)',DeleteBalanceTransferparameter,function(data) {
	console.log(data);
	if(data[0][0].SavedStatus == "0"){
		base.send_response("Success", data[0],res);
	}
	else{
		base.send_response("Failure", "",res);				
	}
});

};

var getbalancetransferrequest = function(req, res, next){
		var getbalancetransferrequest = [];
		getbalancetransferrequest.push(req.body.fbaid);	//
		console.log(getbalancetransferrequest);
		con.execute_proc('call GetBalanceTransferRequest(?)',getbalancetransferrequest,function(data) {
		console.log(data);
		
			var responsedata = {"quote":data[0],"application":data[1]};
			 base.send_response("Success", responsedata,res);
		
   	});
}

module.exports = {"BalanceTransfer" :BalanceTransfer , "SetQuoteApplicationBalanceTransfer" :SetQuoteApplicationBalanceTransfer , "DeleteBalanceTransfer" :DeleteBalanceTransfer , "getbalancetransferrequest" :getbalancetransferrequest};