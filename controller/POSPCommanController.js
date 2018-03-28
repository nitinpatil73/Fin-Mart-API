var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var app = require('./wrapper.js');
 
class POSPCommanController{};
POSPCommanController.GetProdPriceDeta=function(CustID,mobileno,custname,emailid,fbaid,res,pospno,next) {
app('/api/CommonAPI/GetProdPriceDeta', 'POST', {
		"ProdID": "501",
		"CustID": CustID,
		"PartID": "4444444",
		"UserID": "0",
		"IsScheme": "0",
		"FBAId": 0,
		"ResponseJson": null,
		"AppID": "171",
		"AppUSERID": "3OK92Dl/LwA0HqfC5+fCxw==",
		"AppPASSWORD": "BjLfd1dqTCyH1DQLhylKRQ=="
	  }, function(dataa) {
	  	console.log("....GetProdPriceDeta.......");
	  	console.log(dataa);
	  	if(dataa.message !=null){
	  		var message =JSON.parse(dataa.message);
	  		if(message.Status=="1"){
	  			var amount = message.TotalAmt;	 
	  			console.log("amount:"+amount); 		
	  			PaymentDataRequest(CustID,amount,mobileno,custname,emailid,fbaid,res,pospno,function(pay_data,status){
	  				if(status==0){
	  					console.log("Failure......................")

	  				}else{
	  					console.log("Success.......................")
	  				}
	  				console.log(pay_data);
	  				next(pay_data,status);
	  			});
	  		}
	  		else{
	  			//base.send_response("Invalid response in GetProdPriceDeta", null,res);
	  			next("Invalid response in GetProdPriceDeta",0);
	  		}
	  		console.log(message);
	  	}
	  	else{
	  			//base.send_response("Invalid response in GetProdPriceDeta 1", null,res);
	  			next("Invalid response in GetProdPriceDeta 1",0);
	  		}
	  	
	  },5);
}

function PaymentDataRequest(CustID,totalamount,mobileno,custname,emailid,fbaid,res,pospno,next) {

app('/api/PaymentGateway/PaymentDataRequest', 'POST', {
	  "Amount": 590,
	  "ProdID": 501,
	  "MRP": 500,
	  "Discount": 0,
	  "ServTaxAmt": 90,
	  "VATAmt": 0,
	  "TotalAmt": totalamount,
	  "BalanceAmt": 0,
	  "DatacompCustomerID": CustID,
	  "CustomerMobileNumber": mobileno,
	  "PartID": 0,
	  "CustomerEmailID": emailid,
	  "CustomerName": custname,
	  "OrderDesp": "Platform for onboarding for Fin-Mart",
	  "AccNotes": "Platform for onboarding for Fin-Mart",
	  "SuccResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTSuccess.aspx",
	  "FailResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTFailed.aspx",
	  "CancResp": "http://sales.datacompwebtech.com/GatewayResponse/DWTCancelled.aspx",
	  "ufv1": "853",
	  "ufv2": "",
	  "ufv3": "",
	  "ufv4": "",
	  "ufv5": "",
	  "BranCode": "",
	  "ProdDesc": "Platform for onboarding for Fin-Mart",
	  "ProdUSERID": null,
	  "ProdPASSWORD": null,
	  "DebitCredit": 0,
	  "PromCode": null,
	  "DWTInvo": null,
	  "AppID": "171",
	  "AppUSERID": "3OK92Dl/LwA0HqfC5+fCxw==",
  "AppPASSWORD": "BjLfd1dqTCyH1DQLhylKRQ=="
	  }, function(data) {

		console.log("---PaymentDataRequest----");
		console.log(data);
	  	if(data.type == "Success"){
	  		console.log(message);
	  		var message = JSON.parse(data.message);
	  		console.log("-------------------------------");
	  		console.log(message);
	  		if(message.Status == "1"){
	  			var parameter = [];
	  			parameter.push(fbaid);
	  			parameter.push(message.PaymentURL);
	  			parameter.push(message.PaymRefeID);
	  			parameter.push(CustID);
	  			parameter.push(501);
	  			console.log(parameter);
	  			con.execute_proc('call sp_InsPaymentlink(?,?,?,?,?)',parameter,function(respdata) {
	  				console.log(respdata);
					if(respdata[0][0].SavedStatus == 0){
						message.POSPNo = pospno;
						next(message,1);
						//base.send_response("Success", message,res);
					}
					else{
						//base.send_response(respdata[0][0].Message, null,res);
						next(respdata[0][0].Message,0);
					}	
				});
			  	//base.send_response("Success", message,res);
	  		}
	  		else{
	  			next("Invalid response in PaymentDataRequest",0);
	  			//base.send_response("Invalid response in PaymentDataRequest", null,res);
	  		}
	  	}
	  	else{
	  		next("Invalid response in ", 0);
	  		// base.send_response("Invalid response in `", null,res);
	  	}
	  	
	  },5);
}

module.exports=POSPCommanController;