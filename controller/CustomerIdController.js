var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
class CustomerIdController{};
CustomerIdController.SetCustomerId=function(fbaid,req,res,next) {
	var res_data=null;
	var res_msg="failure";
	//console.log("-----------------------1------------------------");
	
	pre_process_data(fbaid,req,function(inputInfo){
		//console.log(inputInfo);
		//from api fbaid come in req and fbaid param is -1 so setting manually from req
		if(fbaid==-1){fbaid=req.body.FBAId;}
			if(inputInfo){
			var authenticateInputInfo = {
				AppID : "171",
				AppUSERID : "3OK92Dl/LwA0HqfC5+fCxw==",
				AppPASSWORD : "BjLfd1dqTCyH1DQLhylKRQ=="
			};

			call_cust_soap(authenticateInputInfo,inputInfo,function(result){
				//console.log(result);
				if(result){
		          			if(result.CreateCustomerResult.Status=="1"){
		          				var customer = [];
								customer.push(result.CreateCustomerResult.CustID);
								customer.push(fbaid);
								// console.log("++++++++++++++++++++++++++")
								// console.log(customer);
		          				con.execute_proc('call sp_update_CustIdAndFOC(?,?)',customer,function(respdata) {
									//console.log(respdata);
								});
		          			}
		          			else if(result.CreateCustomerResult.Status=="2"){
		          				//console.log(result.CreateCustomerResult.MSG);
		          			}
		          			else{
		          				//console.log(result.CreateCustomerResult.MSG);
		          			}
		          			res_msg="success";
		          			res_data=result;
		          				
		          		}
		          		next(res_data,res_msg);
			});
			}

	});
			    
};

function call_cust_soap(authenticateInputInfo,inputInfo,next){
	//console.log("-----------------------2------------------------");

		    var soap = require('soap');
		    var url = 'http://magicsales.dwtsims.com/WCFServices/WCFServices.svc?wsdl';
		    var args = { "inputInfo" :inputInfo , "authenticateInputInfo" : authenticateInputInfo };
		   // console.log(args);
		    var message = "success";
		    soap.createClient(url, function (err, client) {
		        client.CreateCustomer(args, function (err, result) {
		          if(err)
		          	throw err;
		          else
		          	{
		          		next(result);
		          		//console.log("-----------------------result----------------------------");
		          		//console.log(result);

		          	}
		        });
		    });
		    
}
function pre_process_data(fbaid,req,next){
//console.log("-----------------------3------------------------");
			var fbaparameter = [];
			fbaparameter.push(req.body.FBAId);
			var inputInfo={};
			if(fbaid!=-1){ 
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
				next(inputInfo);
			}else{
	//  -1 means req is made by api to update customer id manually
			con.execute_proc('call customer_controllet_get_fba_data(?)',fbaparameter,function(data) {
				//console.log("-----------------------4------------------------");
				//console.log(data);
					if(data != null){
						// console.log("++++++++++++++++++++++++++++++++++++++++")
						// console.log(data);
						fbaid=data[0][0].FBAID;
						inputInfo =
						 {
							CustType : "1",
							Gender : data[0][0].Gender,// m for male ;f for female
							CompName : "",// Company name
							FirstName :data[0][0].FirsName,// "Sidheswar";
							MiddleName : "",
							LastName : data[0][0].LastName,//"Senapati";
							Add1 : data[0][0].Address1,// "jogeswari";
							Add2 : data[0][0].Address2, // "Mumbai";
							Add3 : data[0][0].Address3,// "Mumbai";
							Pincode : data[0][0].PinCode,// "400062";
							STDCode : "",
							LandLine : "",
							City : data[0][0].City,// "Mumbai";
							Division : "",
							Branch : "",
							Mobile1 : data[0][0].MobiNumb1,// "9938885469";
							Mobile2 : data[0][0].MobiNumb2,// "";
							EmailId1 : data[0][0].EmailID,// "sidheswar@datacompwebtech.com";
							EmailId2 : "",
							DOB : data[0][0].DOB,// "06-Jun-1989";
							MarrDate : "",
							PartId : "0",
							DOCode : "",
							DOName : "",
							Flag : "F",// For finmart
							USERID : "0",
							Rating : ""
						};
						next(inputInfo);
					}
					else{
						next(null);				
					}
				});
			}

	
}
module.exports=CustomerIdController;