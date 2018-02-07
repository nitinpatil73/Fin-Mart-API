
var wrapper = require('./wrapper.js');
// var response_status = require('./responsestatus');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');



var smarthealth = function(req, res, next) {

//manageHealthRequest(req, res, next);

wrapper('/quotes/api/SmartHealth', 'POST', {
    CityID: req.body.HealthRequest.CityID,
    ContactEmail: req.body.HealthRequest.ContactEmail,
    ContactMobile: req.body.HealthRequest.ContactMobile,
    ContactName: req.body.HealthRequest.ContactName,
    DeductibleAmount: req.body.HealthRequest.DeductibleAmount,
    ExistingCustomerReferenceID: req.body.HealthRequest.ExistingCustomerReferenceID,
    HealthType: req.body.HealthRequest.HealthType,
    MaritalStatusID: req.body.HealthRequest.MaritalStatusID,
    MemberList: req.body.HealthRequest.MemberList,
    PolicyFor: req.body.HealthRequest.PolicyFor,
    PolicyTermYear: req.body.HealthRequest.PolicyTermYear,
    ProductID: req.body.HealthRequest.ProductID,
    SessionID: req.body.HealthRequest.SessionID,
    SourceType: req.body.HealthRequest.SourceType,
    SumInsured: req.body.HealthRequest.SumInsured,
    SupportsAgentID: req.body.HealthRequest.SupportsAgentID

  }, function(data) {
    console.log(data);
  	if(data!=null){
      manageHealthRequest(req, res, next,data);
	  	// base.send_response("success",data, res);
  	}
  	else{
  		base.send_response("failure",data, res);
  	}
  },2);
}


var manageHealthRequest = function(req, res, next,responsedata) {

var parameter = [];

if(req.body.HealthRequestId){
  parameter.push(req.body.HealthRequestId); 
}
else{
  parameter.push(0);
}

parameter.push(req.body.crn); 
parameter.push(req.body.HealthRequest.CityID); 
parameter.push(req.body.HealthRequest.ContactEmail); 
parameter.push(req.body.HealthRequest.ContactMobile); 
parameter.push(req.body.HealthRequest.ContactName); 
parameter.push(req.body.HealthRequest.DeductibleAmount); 
parameter.push(req.body.HealthRequest.ExistingCustomerReferenceID); 
parameter.push(req.body.HealthRequest.HealthType); 
parameter.push(req.body.HealthRequest.MaritalStatusID); 
parameter.push(req.body.HealthRequest.PolicyFor); 
parameter.push(req.body.HealthRequest.PolicyTermYear); 
parameter.push(req.body.HealthRequest.ProductID); 
parameter.push(req.body.HealthRequest.SessionID);
parameter.push(req.body.HealthRequest.SourceType);
parameter.push(req.body.HealthRequest.SumInsured);
parameter.push(req.body.HealthRequest.SupportsAgentID);
parameter.push(req.body.fba_id);
parameter.push(req.body.agent_source);
console.log("Length:"+req.body.HealthRequest.MemberList.length);
var memberlist = "";
for (var i = 0; i < req.body.HealthRequest.MemberList.length; i++) {
   memberlist += req.body.HealthRequest.MemberList[i].MemberDOB +","+req.body.HealthRequest.MemberList[i].MemberGender +","+req.body.HealthRequest.MemberList[i].MemberNumber +","+req.body.HealthRequest.MemberList[i].MemberType +","+req.body.HealthRequest.MemberList[i].MemberTypeID +"|";
 } 
 parameter.push(memberlist);
console.log(parameter);

  con.execute_proc('call ManageHealthRequest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',parameter,function(data) {
    console.log(data[0][0]);
    if(data[0][0].SavedStatus=="0"){
      var response = {
        "HealthRequestId" : data[0][0].HealthRequestId,
        "health_quote": responsedata
      };
      base.send_response("Success", response,res);
    }
    else{
      base.send_response("Failure",null,res);
    }
  });
};





// });

module.exports = smarthealth;