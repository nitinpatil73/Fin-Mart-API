
var wrapper = require('./wrapper.js');
// var response_status = require('./responsestatus');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');
var handler = require('./HandlerController');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var smarthealth1 = function(req, res, next) {
  var mongo_conn=require('../bin/mongo_conn.js');
  mongoose.connect(mongo_conn, { autoIndex: false });
  var RequestSchema = new Schema({
    MasterData: {

      header : {
         CustomerReferenceID : Number,
                QuoteId : Number,
                PolicyTermYear : Number,
      },
      child : Object
    } 
});
var RBLog = mongoose.model('smarthealth',RequestSchema);
base.send_response("success",RBLog,res);
}

var smarthealth = function(req, res, next) {
//console.log("asfdsf");
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
    var CustomerReferenceID = "";
  	if(data!=null){
      var uniqueInsurerId = [];
      var uniqueData = [];
      var remainingData = [];
      for(i = 0; i< data.length; i++){
        CustomerReferenceID = data[0].CustomerReferenceID;
          if(uniqueInsurerId.indexOf(data[i].InsurerId) === -1){
            if(data[i].QuoteStatus == "Success"){
                uniqueInsurerId.push(data[i].InsurerId);
                uniqueData.push(data[i]);
              }
          }else{
             if(data[i].QuoteStatus == "Success"){
                remainingData.push(data[i]);
              }
          }
      }

      var final = {"header" :uniqueData , "child" : remainingData};
      console.log(final);
      //base.send_response("success",final,res);

      manageHealthRequest(req, res, next,final,CustomerReferenceID);	  	

  	}
  	else{
  		base.send_response("failure",data, res);
  	}
  },2);
}


var manageHealthRequest = function(req, res, next,responsedata,CustomerReferenceID) {

var parameter = [];

if(req.body.HealthRequestId){
  parameter.push(req.body.HealthRequestId); 
}
else{
  parameter.push(0);
}
// CustomerReferenceID
parameter.push(CustomerReferenceID); 
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
//console.log("Length:"+req.body.HealthRequest.MemberList.length);
var memberlist = "";
for (var i = 0; i < req.body.HealthRequest.MemberList.length; i++) {
   memberlist += req.body.HealthRequest.MemberList[i].MemberDOB +","+req.body.HealthRequest.MemberList[i].MemberGender +","+req.body.HealthRequest.MemberList[i].MemberNumber +","+req.body.HealthRequest.MemberList[i].MemberType +","+req.body.HealthRequest.MemberList[i].MemberTypeID +"|";
 } 
 parameter.push(memberlist);
//console.log(parameter);

  con.execute_proc('call ManageHealthRequest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',parameter,function(data) {
    console.log(data[0][0]);
    if(data[0][0].SavedStatus=="0"){
      var response = {
        "HealthRequestId" : data[0][0].HealthRequestId,
        "health_quote": responsedata
      };
      console.log(responsedata);
      base.send_response("Success", response,res);
    }
    else{
      base.send_response("Failure",null,res);
    }
  });
};



var getHealthRequest = function(req, res, next) {

var parameter = [];

if(req.body.fba_id){
  parameter.push(req.body.fba_id); 
}
else{
  parameter.push(null);
}
console.log(parameter);

  con.execute_proc('call getHealthRequest(?)',parameter,function(data) {


    
    var quoteresponse = [];
    var applicationquote = [];
 //console.log(data[0][0].MemberList);

    for (var i = 0; i < data[0].length; i++) {
      data[0][i].progress_image = null;
      var healthrequest = data[0][i];
      var arr = JSON.parse(data[0][i].MemberList);
           
      healthrequest.MemberList =arr;// array(data[0][i].MemberList);
      var response ={
        "fba_id" : data[0][i].fba_id,
        "HealthRequestId" : data[0][i].HealthRequestId,
        "agent_source" : data[0][i].agent_source,
        "crn" : data[0][i].crn,
        "selectedPrevInsID" : data[0][i].selectedPrevInsID,
        "HealthRequest" : healthrequest
      };
      quoteresponse.push(response);
    }


    for (var i = 0; i < data[1].length; i++) {
      data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
      var healthrequest = data[1][i];
      var arr = JSON.parse(data[1][i].MemberList);
      
      healthrequest.MemberList =arr;
      var response ={
        "fba_id" : data[1][i].fba_id,
        "HealthRequestId" : data[1][i].HealthRequestId,
        "agent_source" : data[1][i].agent_source,
        "crn" : data[1][i].crn,
        "selectedPrevInsID"  : data[1][i].selectedPrevInsID,
        "HealthRequest" :healthrequest
      };
      applicationquote.push(response);
    }
    var responsedata = {"quote":quoteresponse,"application":applicationquote};
    base.send_response("Success", responsedata,res);
  });
};



var deleteHealthRequest = function(req, res, next) {
  var parameter = [];

  if(req.body.HealthRequestId){
    parameter.push(req.body.HealthRequestId); 
  }
  else{
    parameter.push(0);
  }
  con.execute_proc('call deleteHealthRequest(?)',parameter,function(data) {
      if(data[0][0].SavedStatus=="0"){
        base.send_response("Success", data[0],res);
      }
      else{
        base.send_response("Failure",null,res);
      }
  });
};

var setQuoteToApplicationHealthRequest = function(req, res, next) {
  var parameter = [];

  if(req.body.HealthRequestId){
    parameter.push(req.body.HealthRequestId); 
  }
  else{
    parameter.push(0);
  }
  parameter.push(req.body.selectedPrevInsID); 
  
  con.execute_proc('call setQuoteToApplicationHealthRequest(?,?)',parameter,function(data) {
      if(data[0][0].SavedStatus=="0"){
        base.send_response("Success", data[0],res);
      }
      else{
        base.send_response("Failure",null,res);
      }
  });
};






// });

module.exports = {"smarthealth":smarthealth,"getHealthRequest":getHealthRequest,"deleteHealthRequest":deleteHealthRequest,"setQuoteToApplicationHealthRequest":setQuoteToApplicationHealthRequest};
