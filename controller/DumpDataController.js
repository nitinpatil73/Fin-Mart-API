var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');
var status=0;
var dumpdatacontroller = function(req, res, next) {
		wrapper('/BankAPIService.svc/GetQuickLeadDetail', 'GET',{
		},function(response) {
			if(response != null && response != ''){
				console.log(response.length);
			console.log("---------------------------------------");	
				for(var i=0; i<response.length; i++){
					console.log(i);
					var Lead_Date_Format = new Date(response[i].Lead_Date)
					var FollowUp_Date_Format = new Date(response[i].FollowUp_Date)
					var dumpdataparameter = [];
					dumpdataparameter.push(response[i].Broker_Id);
					dumpdataparameter.push(response[i].Email);
					dumpdataparameter.push(response[i].FBA_Id);
					dumpdataparameter.push(formatDate(FollowUp_Date_Format));
					dumpdataparameter.push(formatDate(Lead_Date_Format));
					dumpdataparameter.push(response[i].Lead_Status_Id);
					dumpdataparameter.push(response[i].Lead_id);
					dumpdataparameter.push(response[i].Loan_Amt);
					dumpdataparameter.push(response[i].Mobile);
					dumpdataparameter.push(response[i].MonthlyIncome);
					dumpdataparameter.push(response[i].Name);
					dumpdataparameter.push(response[i].Product_Id);
					dumpdataparameter.push(response[i].Remark);
					//console.log(dumpdataparameter);
					con.execute_proc('call quickleadrequest_data(?,?,?,?,?,?,?,?,?,?,?,?,?)',dumpdataparameter,function(savedata) {
    					if(savedata[0][0].SavedStatus == 0){
					      status=1;
					    }
					    else{
					    	console.log(dumpdataparameter);
					    	console.log(savedata);
					      status=0;
					    }
					});
				}
				
					   base.send_response("Record saved successfully","Success",res);
				
				//base.send_response("Success",response,res);
			}else{
				base.send_response("Failure",null,res);
			}

		},6);
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var second = date.getSeconds();
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes +':'+ second;
  return date.getFullYear()+1 + "-" + date.getMonth() + "-" + date.getDate() + "  " + strTime;
}
module.exports = {"dumpdatacontroller":dumpdatacontroller};