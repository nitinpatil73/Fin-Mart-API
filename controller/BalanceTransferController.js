var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var handler = require('./HandlerController');

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
BalanceTransferparameter.push(req.body.BLLoanRequest.LoanID);	//
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
		base.send_response("Success", data[0],res);
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
		if(req.body.FBA_id){
	    	getbalancetransferrequest.push(req.body.FBA_id);
		}
		else{
		    getbalancetransferrequest.push(null); 
		}

		if(req.body.count){
	    	getbalancetransferrequest.push(req.body.count);
		}
		else{
		    getbalancetransferrequest.push(0); 
		    req.body.count=0;
		}

		if(req.body.type){
	    	getbalancetransferrequest.push(req.body.type);
		}
		else{
		    getbalancetransferrequest.push(0); 
		 	req.body.type=0;
		}
		// getbalancetransferrequest.push(req.body.FBA_id);
		// getbalancetransferrequest.push(req.body.count);
		// getbalancetransferrequest.push(req.body.type);

	if(req.body.type == 0)
	{	//
		con.execute_proc('call GetBalanceTransferRequest(?,?,?)',getbalancetransferrequest,function(data) {
		console.log(data);
		var quoteresponse = [];
		var applicationquote = [];
		for (var i = 0; i < data[0].length; i++) {
		var zeroimage ="http://"+ req.headers.host + "/images/progress/zero_percent.png"
			data[0][i].progress_image = zeroimage;
			var response ={				
				"BalanceTransferId" : data[0][i].BalanceTransferId,
				"FBA_id" : data[0][i].fbaid,
				"BLLoanRequest" : data[0][i]
			};
			quoteresponse.push(response);
		}
		for (var i = 0; i < data[1].length; i++) {
			//data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
			var zeroimage ="http://"+ req.headers.host + "/images/progress/zero_percent.png"
			data[1][i].progress_image = zeroimage;
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
	else if(req.body.type == 1)
	{
		con.execute_proc('call GetBalanceTransferRequest(?,?,?)',getbalancetransferrequest,function(data) {
		console.log(data);
		var quoteresponse = [];
		for (var i = 0; i < data[0].length; i++) {
			var zeroimage ="http://"+ req.headers.host + "/images/progress/zero_percent.png"
			data[0][i].progress_image = zeroimage;
			var response ={				
				"BalanceTransferId" : data[0][i].BalanceTransferId,
				"FBA_id" : data[0][i].fbaid,
				"BLLoanRequest" : data[0][i]
			};
			quoteresponse.push(response);
		}
		var responsedata = {"quote":quoteresponse,"application":[]};
		base.send_response("Success", responsedata,res);
   		});
	}

	else if(req.body.type == 2)
	{
		con.execute_proc('call GetBalanceTransferRequest(?,?,?)',getbalancetransferrequest,function(data) {
		console.log(data);
		var applicationquote = [];
		for (var i = 0; i < data[0].length; i++) {
			var zeroimage ="http://"+ req.headers.host + "/images/progress/zero_percent.png"
			data[0][i].progress_image = zeroimage;
			//data[0][i].progress_image = handler.validateimage(req,data[0][i].StatusPercent);
			var response ={
				
				"BalanceTransferId" : data[0][i].BalanceTransferId,
				"FBA_id" : data[0][i].fbaid,
				"BLLoanRequest" : data[0][i]
			};
			applicationquote.push(response);
		}
			var responsedata = {"quote":[],"application":applicationquote};
			 base.send_response("Success", responsedata,res);
   		});
	}

	else
	{
		base.send_response("Failure type not match", "",res);
	}

}

module.exports = {"BalanceTransfer" :BalanceTransfer , "SetQuoteApplicationBalanceTransfer" :SetQuoteApplicationBalanceTransfer , "DeleteBalanceTransfer" :DeleteBalanceTransfer , "getbalancetransferrequest" :getbalancetransferrequest};