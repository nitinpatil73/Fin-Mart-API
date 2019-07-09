
var wrapper = require('./wrapper.js');
// var response_status = require('./responsestatus');
var base=require('./baseController');
var con=require('../bin/dbconnection.js');
var handler = require('./HandlerController');


var manageHealthRequestOffline = function(req, res, next) {

var parameter = [];

if(req.body.HealthRequestId){
  parameter.push(req.body.HealthRequestId); 
}
else{
  parameter.push(0);
}
// CustomerReferenceID
parameter.push(0); 
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
parameter.push(req.body.comment);

//console.log("Length:"+req.body.HealthRequest.MemberList.length);
var memberlist = "";
for (var i = 0; i < req.body.HealthRequest.MemberList.length; i++) {
   memberlist += req.body.HealthRequest.MemberList[i].MemberDOB +","+req.body.HealthRequest.MemberList[i].MemberGender +","+req.body.HealthRequest.MemberList[i].MemberNumber +","+req.body.HealthRequest.MemberList[i].MemberType +","+req.body.HealthRequest.MemberList[i].MemberTypeID +","+req.body.HealthRequest.MemberList[i].Age +"|";
 } 
// console.log("=========================memberlist============================");
// console.log(memberlist);
 parameter.push(memberlist);
 parameter.push(req.body.HealthRequest.pincode);
 if(req.body.CreatedByUserFbaId != null && req.body.CreatedByUserFbaId != '')
 {
   parameter.push(req.body.CreatedByUserFbaId);
 }
 else
 {
   parameter.push(null);
 }
//console.log(parameter);
//console.log("...............2435.............");
  con.execute_proc('call ManageHealthRequestOfflineQuote(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',parameter,function(data) {
  //  console.log("............................");
  //  console.log(data[0][0]);
    if(data[0][0].SavedStatus=="0"){
      // var response = {
      //   "HealthRequestId" : data[0][0].HealthRequestId,
      //   "health_quote": responsedata
      // };
   //   console.log(responsedata);
      base.send_response("Success", data[0],res);
    }
    else{
      base.send_response("Failure",null,res);
    }
  });
};



var getHealthRequestOfflineQuote = function(req, res, next) {
 // console.log("test");
var parameter = [];
if(req.body.fba_id){
  parameter.push(req.body.fba_id); 
}
else{
  parameter.push(null);
}
if(req.body.count){
  parameter.push(req.body.count);
}
else{
  parameter.push(0);
  req.body.count=0;
}

console.log("asff");
con.execute_proc('call getHealthRequestOfflineQuote(?,?)',parameter,function(data) {
  console.log(data);
    var quoteresponse = [];       
    for (var i = 0; i < data[0].length; i++) {
    
      data[0][i].progress_image = null;
      var healthrequest = data[0][i];
      console.log("------------");


      try{
            var arr = JSON.parse(data[0][i].MemberList);

            healthrequest.MemberList =arr;

            var quote = []; 

        for (var j = 0; j < data[1].length; j++) {  
          //console.log(data[1][j].TranId);       
          if(data[1][j].TranId == data[0][i].TransId){
             // console.log(data[1][j].TransId);
             // console.log(data[0][i].TranId);
              quote.push(data[1][j]);
            }
          }

            var response ={
              "fba_id" : data[0][i].FBAID,
              "HealthRequestId" : data[0][i].HealthRequestId,
              "agent_source" : data[0][i].agent_source,
              "crn" : data[0][i].crn,
              "selectedPrevInsID" : data[0][i].selectedPrevInsID,
              "CreatedByUserFbaId" : data[0][i].CreatedByUserFbaId,
              "CreatedByUserFbaName" : data[0][i].CreatedByUserFbaName,
              "HealthRequest" : healthrequest,
              "quote" : quote
            };
          
            quoteresponse.push(response);
      }
      catch(error) {
      console.error(error);
    }
   
    }
   // console.log(quoteresponse);

    // for (var i = 0; i < data[1].length; i++) {
    //   data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
    //   var healthrequest = data[1][i];
    //   var arr = JSON.parse(data[1][i].MemberList);


      
    //   healthrequest.MemberList =arr;
    //   var response ={
    //     "fba_id" : data[1][i].FBAID,
    //     "HealthRequestId" : data[1][i].HealthRequestId,
    //     "agent_source" : data[1][i].agent_source,
    //     "crn" : data[1][i].crn,
    //     "selectedPrevInsID"  : data[1][i].selectedPrevInsID,
    //     "insImage" : data[1][i].insImage,
    //     "HealthRequest" :healthrequest
    //   };
    //   applicationquote.push(response);
    // }
  //  console.log("******************************");
   // var responsedata = {"quote":quoteresponse,"application":applicationquote};
    base.send_response("Success", quoteresponse,res);
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
  parameter.push(req.body.insImage); 
  
  con.execute_proc('call setQuoteToApplicationHealthRequest(?,?,?)',parameter,function(data) {
      if(data[0][0].SavedStatus=="0"){
        base.send_response("Success", data[0],res);
      }
      else{
        base.send_response("Failure",null,res);
      }
  });
};


var GetCompareBenefits = function (req, res, next) {
wrapper('/WMDataservice/api/HealthInsurance/GetCompareBenefits', 'POST', {
   "StrProdBeneID": req.body.StrProdBeneID,
  "IFAID": "27bgc7eiR5RoCV5xXvTcTQ==",
  }, function(data) {
    // console.log(data);
     if(data!=null && data.length>0){
        base.send_response("Success", data,res);    
     }
     else{
        base.send_response("Failed to fetch", null,res);
     }
  },8);
};

var ComparePremium = function (req, res, next) {
    var helth_req_id = [];
    helth_req_id.push(req.body.HealthRequestId);
    helth_req_id.push(req.body.PlanID);

    if(req.body.ProdID && req.body.ProdID!=0){
      helth_req_id.push(req.body.ProdID);
    }
    else{
      helth_req_id.push(null);
    }
//console.log(helth_req_id);
    var getcomparedata;
  con.execute_proc('call get_compare_premium(?,?,?)',helth_req_id,function(response) {
    if(response!=null){      

// console.log( {
//     "CityID": response[0][0].CityID,
//     "PlanID": response[0][0].PBPlanID,
//     "HealthRequestId": req.body.HealthRequestId,
//     "FBAID": response[0][0].fba_id,
//     "ContactEmail": response[0][0].ContactEmail,
//     "ContactMobile": response[0][0].ContactMobile,
//     "ContactName": response[0][0].ContactName,
//     "DeductibleAmount": 0,
//     "ExistingCustomerReferenceID": 0,
//     "HealthType": "Health",
//     "MaritalStatusID": response[0][0].MaritalStatusID,
//     "MemberList": req.body.MemberList,
//     "PolicyFor": response[0][0].PolicyFor,
//     "PolicyTermYear": 1,
//     "ProductID": 2,
//     "SessionID": "",
//     "SourceType": "APP",
//     "SumInsured": response[0][0].SumInsured,
//     "SupportsAgentID": 2
//   });
wrapper('/api/SmartHealth', 'POST', {
    "CityID": response[0][0].CityID,
    "PlanID": response[0][0].PBPlanID,
    "HealthRequestId": req.body.HealthRequestId,
    "FBAID": response[0][0].fba_id,
    "ContactEmail": response[0][0].ContactEmail,
    "ContactMobile": response[0][0].ContactMobile,
    "ContactName": response[0][0].ContactName,
    "DeductibleAmount": 0,
    "ExistingCustomerReferenceID": 0,
    "HealthType": "Health",
    "MaritalStatusID": response[0][0].MaritalStatusID,
    "MemberList": req.body.MemberList,
    "PolicyFor": response[0][0].PolicyFor,
    "PolicyTermYear": 1,
    "ProductID": 2,
    "SessionID": "",
    "SourceType": "APP",
    "SumInsured": response[0][0].SumInsured,
    "SupportsAgentID": 2
  }, function(data) {
    if(data!=null && data.length>0){
//console.log("----------wrapper retured----");
       var memberlistparameter = []; 
       var memberlist = "";
       for (var i = 0; i < req.body.MemberList.length; i++) {
            memberlist += req.body.MemberList[i].MemberDOB +","+req.body.MemberList[i].MemberGender +","+req.body.MemberList[i].MemberNumber +","+req.body.MemberList[i].MemberType +","+req.body.MemberList[i].MemberTypeID +"|";
        } 
        memberlistparameter.push(memberlist); 
        memberlistparameter.push(req.body.HealthRequestId);
        con.execute_proc('call saved_member_list(?,?)',memberlistparameter,function(data) {
        // if(data[0][0].SavedStatus == 0){
        //   base.send_response("Record saved successfully",data[0][0],res);
        // }
        // else{
        //   base.send_response("Failure", "",res);        
        // }
      });

      var compare_premium_parameter = [];
      compare_premium_parameter.push(req.body.HealthRequestId);
      compare_premium_parameter.push(data[0].CustomerReferenceID);
      con.execute_proc('call compare_premium(?,?)',compare_premium_parameter,function(responsedata) {
        if(responsedata[0][0].SavedStatus == "0"){
          if(data[0].QuoteStatus == "Success"){
              var parameterCompare = [];
              parameterCompare.push(req.body.HealthRequestId); 
              parameterCompare.push(req.body.selectedPrevInsID); 
              parameterCompare.push(req.body.insImage); 
              con.execute_proc('call setQuoteToApplicationHealthRequest(?,?,?)',parameterCompare,function(datacompare) {
              if(datacompare[0][0].SavedStatus=="0"){
                      var response={
                        NetPremium : data[0].NetPremium,
                        ProposerPageUrl : data[0].ProposerPageUrl,
                      }
//console.log("---*******************************************------------------------");
//console.log(response);
                      base.send_response("Success",response,res);
                  }
                  else{
                    base.send_response("Failure",null,res);
                  }
              });
        }
        else{
          base.send_response("Failure", null,res);        
        }
      }else{
          base.send_response("Failure", null,res);        
        }
      });
    }
    else{
        base.send_response("failure",null, res);
    }
  },2);
//console.log('done');
     //   base.send_response("Success",response,res);
    }else{
         base.send_response("failure",null,res);
    }
  
  });

};

module.exports = {"manageHealthRequestOffline" : manageHealthRequestOffline,"getHealthRequestOfflineQuote" : getHealthRequestOfflineQuote};
