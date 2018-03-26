var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
class CustomerIdController{};
CustomerIdController.SetCustomerId=function(fbaid,req, res, next) {
	var inputInfo={};
	if(fbaid==-1){ 
		//  -1 means req is made by api to update customer id manually
		fbaid=req.body.FBAId;
		inputInfo=req.body;
	}else{
		inputInfo =
		 {
			CustType : "1",
			Gender : req.body.Gender,// m for male ;f for female
			CompName : "",// Company name
			FirstName : req.body.FirstName,// "Sidheswar";
			MiddleName : "",
			LastName : req.body.LastName,//"Senapati";
			Add1 : req.body.Address_1,// "jogeswari";
			Add2 : req.body.Address_2, // "Mumbai";
			Add3 : req.body.Address_3,// "Mumbai";
			Pincode : req.body.PinCode,// "400062";
			STDCode : "",
			LandLine : "",
			City : req.body.City,// "Mumbai";
			Division : "",
			Branch : "",
			Mobile1 : req.body.Mobile_1,// "9938885469";
			Mobile2 : req.body.Mobile_2,// "";
			EmailId1 : req.body.EmailId,// "sidheswar@datacompwebtech.com";
			EmailId2 : "",
			DOB : req.body.DOB,// "06-Jun-1989";
			MarrDate : "",
			PartId : "0",
			DOCode : "",
			DOName : "",
			Flag : "F",// For finmart
			USERID : "0",
			Rating : ""
		};
	}
	 


	var authenticateInputInfo = {
		AppID : "171",
		AppUSERID : "3OK92Dl/LwA0HqfC5+fCxw==",
		AppPASSWORD : "BjLfd1dqTCyH1DQLhylKRQ=="
	};


    var soap = require('soap');
    var url = 'http://magicsales.dwtsims.com/WCFServices/WCFServices.svc?wsdl';
    var args = { "inputInfo" :inputInfo , "authenticateInputInfo" : authenticateInputInfo };
    console.log(args);
    var message = "success";
    soap.createClient(url, function (err, client) {
        client.CreateCustomer(args, function (err, result) {
          if(err)
          	console.log(err);
          else
          	{
          		if(result){
          			if(result.CreateCustomerResult.Status=="1"){
          				var customer = [];
						customer.push(result.CreateCustomerResult.CustID);
						customer.push(fbaid);

          				con.execute_proc('call sp_update_CustIdAndFOC(?,?)',customer,function(respdata) {
							console.log(respdata);
						});
          			}
          			else if(result.CreateCustomerResult.Status=="2"){
          				console.log(result.CreateCustomerResult.MSG);
          			}
          			else{
          				console.log(result.CreateCustomerResult.MSG);
          			}
          			if(result.CreateCustomerResult.CustID){
          				base.send_response(result.CreateCustomerResult.MSG, result.CreateCustomerResult.CustID,res);	
          			}else{
          				base.send_response(result.CreateCustomerResult.MSG,null,res);
          			}
          			
          		}else{
          			base.send_response("Unable to fetch Customer ID", null,res);
          		}

          	}
        });
    });
        
};

module.exports=CustomerIdController;