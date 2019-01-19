var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var savemoterleaddetails = function(req,res,next){
	if(req.body.FBAID != null && req.body.FBAID != ''){
		if(req.body.RegistrationNo != null && req.body.RegistrationNo != ''){
			if(req.body.ExpiryDate != null && req.body.ExpiryDate != ''){
				var savemoterleadpara = [];
				savemoterleadpara.push(req.body.FBAID);
				savemoterleadpara.push(req.body.RegistrationNo);
				savemoterleadpara.push(req.body.RegistrationDate);
				savemoterleadpara.push(formatDate(req.body.ExpiryDate));
				savemoterleadpara.push(req.body.Category);
				savemoterleadpara.push(req.body.ChasisNo);
				savemoterleadpara.push(req.body.City);
				savemoterleadpara.push(req.body.ClaimNo);
				savemoterleadpara.push(req.body.ClaimSattlementType);
				savemoterleadpara.push(req.body.ClaimStatus);
				savemoterleadpara.push(req.body.ClientName);
				savemoterleadpara.push(req.body.DOB);
				savemoterleadpara.push(req.body.Email);
				savemoterleadpara.push(req.body.EngineNo);
				savemoterleadpara.push(req.body.FuelType);
				savemoterleadpara.push(req.body.Gender);
				savemoterleadpara.push(req.body.holderaddress);
				savemoterleadpara.push(req.body.HolderPincode);
				savemoterleadpara.push(req.body.InceptionDate);
				savemoterleadpara.push(req.body.IsCustomer);
				savemoterleadpara.push(req.body.InsuranceID);
				savemoterleadpara.push(req.body.InsuranceName);
				savemoterleadpara.push(req.body.MobileNo);
				savemoterleadpara.push(req.body.Make);
				savemoterleadpara.push(req.body.Mfgyear);
				savemoterleadpara.push(req.body.model);
				savemoterleadpara.push(req.body.NoClaimBonus);
				savemoterleadpara.push(req.body.Name);
				savemoterleadpara.push(req.body.Pincode);
				savemoterleadpara.push(req.body.PolicyNumber);
				savemoterleadpara.push(req.body.Premium);
				savemoterleadpara.push(req.body.POSPCode);
				savemoterleadpara.push(req.body.POSPName);
				savemoterleadpara.push(req.body.RTOCity);
				savemoterleadpara.push(req.body.RTOState);
				savemoterleadpara.push(req.body.SubModel);
				savemoterleadpara.push(req.body.QT_Entry_Number);
				savemoterleadpara.push(req.body.VehicleRegNumber);

				console.log("-----------date format----------------");
				console.log(savemoterleadpara);

				con.execute_proc('call insert_moter_lead_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',savemoterleadpara,function(rdata){
					console.log(rdata);
					if(rdata[0][0].SavedStatus == '0'){
						base.send_response("Saved successfully.",rdata[0],res);
					}else{
						base.send_response("Failure",null,res);
					}
				})
			}else{
				base.send_response("Failure Expiry Date does not exists.",null,res);
			}
		}else{
			base.send_response("Failure Registration No. does not exists.",null,res);
		}
	}else{
		base.send_response("Failure FBAID does not exists.",null,res);
	}
};


var moterleaddetails = function(req, res, next) {
	con.execute_proc('call Get_VehicleInfoDetailsLog()',null,function(data) {
		if(data != null && data != ''){
			var finalresult = [];
			for (var i = 0; i < data[0].length; i++) {	
				//var jsonvalue = JSON.parse(data[0][i].JsonData);
				var response ={
			        "Id" : data[0][i].Id,
			        "Fbaid" : data[0][i].Fbaid,
			        "Type" : data[0][i].Type,
			        "Details" : data[0][i].Details,
			        "JsonData" :  data[0][i].JsonData,
			        "CreatedDate" : data[0][i].CreatedDate
			      };
				finalresult.push(response);
			}

			var result ={"finalresult":finalresult};
		    base.send_response("Success", result,res);
		}
		else{
		    base.send_response("Failure",null,res);
		}
	});
};

function formatDate(date_exp) {
	var arr = date_exp.split("-");
	return arr[1]+"/"+arr[0]+"/"+arr[2];
}
module.exports = {"savemoterleaddetails":savemoterleaddetails,"moterleaddetails":moterleaddetails};