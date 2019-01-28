var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var creditCardRBL = function (req, res, next) {

var parameter={
		"Title": req.body.Title,
		"DOB": req.body.DOB,
		"FirstName": req.body.FirstName,
		"MiddleName": req.body.MiddleName,
		"LastName": req.body.LastName,
		"FatherName": req.body.FatherName,
		"Gender": req.body.Gender,
		"HadLoanOrCreditCardFromAnyBank": req.body.HadLoanOrCreditCardFromAnyBank,
		"ResAddress1": req.body.ResAddress1,
		"ResAddress2": req.body.ResAddress2,
		"Landmark":req.body.Landmark,
		"ResCity": req.body.ResCity,
		"ResPIN": req.body.ResPIN,
		"Email": req.body.Email,
		"NMI": req.body.NMI,
		"Mobile":req.body.Mobile,
		"EmpType": req.body.EmpType,
		"PAN": req.body.PAN,
		"ConUniqRefCode": req.body.ConUniqRefCode,
		"Version": req.body.Version,
		"CreditCardApplied": req.body.CreditCardApplied,
		"CardType": req.body.CardType,
		"ProcessingFee": req.body.ProcessingFee,
		"brokerid": "MAA=",
		"empid": "MAA=",
		"source": "MAA="
    };
wrapper('/BankAPIService.svc/createRBLCreditCardReq', 'POST', {
		CreditCard: parameter
  }, function(data) {
  	 console.log(data);
  		if(data!=null){
  			var message = JSON.parse(data);
				base.send_response("Success", message,res);		
  		}
  		else{
				base.send_response("Failure", null,res);		
  		}
   

  },6);

    /*var soap = require('soap');
    var url = 'http://api.rupeeboss.com/BankAPIService.svc/createRBLCreditCardReq?wsdl';
    var parameter={
		"Title": 1,
		"DOB": "07-02-1985",
		"FirstName": "Joel",
		"MiddleName": "Padmarao",
		"LastName": "Jangam",
		"FatherName": "Padmarao",
		"Gender": "1",
		"HadLoanOrCreditCardFromAnyBank": "N",
		"ResAddress1": "LBS Marg, Santacruz East",
		"ResAddress2": "Santacruz East",
		"Landmark": "Near Regency Hotel",
		"ResCity": 25,
		"ResPIN": "400055",
		"Email": "joeljangam146@gmail.com",
		"NMI": "500000",
		"Mobile": "7855558888",
		"EmpType": 1,
		"PAN": "ceaij7485j",
		"ConUniqRefCode": "j9nu3r2fi7e0dlj",
		"Version": "6",
		"CreditCardApplied": "16",
		"CardType": "Titanium Delight Card",
		"ProcessingFee": 750,
		"brokerid": "MAA=",
		"empid": "MAA=",
		"source": "MAA="
    };
    var args = {CreditCard: parameter};
    var message = "success";
       soap.createClient(url, function (err, client) {
			if(err){
				console.log(err);
			}
			else{
				console.log(client);
			}
       });*/

};

var getCreditCardData = function(req, res, next){
		
		con.execute_proc('call CreditCardDetails()',null,function(data) {
		if(data!=null)
		{

			for (var i = 0; i < data[1].length; i++) {
			data[1][i].ImagePath = "http://"+ req.headers.host + "/images/creditcard/" + data[1][i].ImagePath;							
			quoteresponse.push(response);
		}

			base.send_response("Success",{"filter":data[0],"filterdata":data[1]},res);
			//}		
		}
		else
		{
			base.send_response("No data found",null,res);
		}	
   	});
}



module.exports = {"creditCardRBL":creditCardRBL,"getCreditCardData":getCreditCardData};