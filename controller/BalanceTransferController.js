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
BalanceTransferparameter.push(req.body.BLLoanRequest.applicantname);
BalanceTransferparameter.push(req.body.BLLoanRequest.loanamount);
BalanceTransferparameter.push(req.body.BLLoanRequest.loaninterest);
BalanceTransferparameter.push(req.body.BLLoanRequest.loanterm);
BalanceTransferparameter.push(req.body.BLLoanRequest.Type);
BalanceTransferparameter.push(req.body.BLLoanRequest.product_id);
BalanceTransferparameter.push(req.body.FBA_id);
BalanceTransferparameter.push(req.body.BLLoanRequest.LoaniD);	//
BalanceTransferparameter.push(req.body.BLLoanRequest.Bank_Id);
BalanceTransferparameter.push(req.body.BLLoanRequest.email);
BalanceTransferparameter.push(req.body.BLLoanRequest.contact);
BalanceTransferparameter.push(req.body.BLLoanRequest.quote_id);
BalanceTransferparameter.push(req.body.BLLoanRequest.source);
console.log(BalanceTransferparameter);

con.execute_proc('call ManageBalanceTransfer(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',BalanceTransferparameter,function(data) {
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
		getbalancetransferrequest.push(req.body.FBA_id);	//
		console.log(getbalancetransferrequest);
		con.execute_proc('call GetBalanceTransferRequest(?)',getbalancetransferrequest,function(data) {
		console.log(data);
		var quoteresponse = [];
		var applicationquote = [];

		for (var i = 0; i < data[0].length; i++) {
			data[0][i].progress_image = null;
			var response ={				
				"BalanceTransferId" : data[0][i].BalanceTransferId,
				"FBA_id" : data[0][i].fbaid,
				"BLLoanRequest" : data[0][i]
			};
			quoteresponse.push(response);
		}

		for (var i = 0; i < data[1].length; i++) {
			data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
			var response ={
				
				"BalanceTransferId" : data[1][i].BalanceTransferId,
				"FBA_id" : data[1][i].fbaid,
				"BLLoanRequest" : data[1][i]
			};
			applicationquote.push(response);
		}
			var responsedata = {"quote":quoteresponse,"application":applicationquote};
			 base.send_response("Success", responsedata,res);
		
   	});
}

module.exports = {"BalanceTransfer" :BalanceTransfer , "SetQuoteApplicationBalanceTransfer" :SetQuoteApplicationBalanceTransfer , "DeleteBalanceTransfer" :DeleteBalanceTransfer , "getbalancetransferrequest" :getbalancetransferrequest};