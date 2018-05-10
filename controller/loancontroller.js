var Loan = require('../model/loanmodel.js');
var base = require('./baseController');
var con=require('../bin/dbconnection.js');
var handler = require('./HandlerController');

var saveLoanData = function(req, res, next) {

console.log(getLoanParameters(req, res, next));
 con.execute_proc('call ManageLoanRequest(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',getLoanParameters(req, res, next),function(data) {
  console.log(data);
  if(data[0][0].SavedStatus == "0"){
    base.send_response("Success", data[0],res);
  }
  else{
      base.send_response("Failure", "",res);        
  }
});

}

function getLoanParameters(req, res, next) {
  var parameters = [];
  if(req.body.loan_requestID){
    parameters.push(req.body.loan_requestID); 
  }
  else{
    parameters.push(0);
  }
    parameters.push(req.body.HomeLoanRequest.ID);
    parameters.push(req.body.HomeLoanRequest.PropertyID);
    parameters.push(req.body.HomeLoanRequest.PropertyCost);
    parameters.push(req.body.HomeLoanRequest.LoanTenure);
    parameters.push(req.body.HomeLoanRequest.LoanRequired);
    parameters.push(req.body.HomeLoanRequest.City);
    parameters.push(req.body.HomeLoanRequest.ApplicantNme);
    parameters.push(req.body.HomeLoanRequest.Email);
    parameters.push(req.body.HomeLoanRequest.Contact);
    parameters.push(req.body.HomeLoanRequest.ApplicantGender);
    parameters.push(req.body.HomeLoanRequest.ApplicantSource);
    parameters.push(req.body.HomeLoanRequest.ApplicantIncome);
    parameters.push(req.body.HomeLoanRequest.ApplicantObligations);
    parameters.push(req.body.HomeLoanRequest.ApplicantDOB);
    parameters.push(req.body.HomeLoanRequest.CoApplicantYes);
    parameters.push(req.body.HomeLoanRequest.CoApplicantGender);
    parameters.push(req.body.HomeLoanRequest.CoApplicantSource);
    parameters.push(req.body.HomeLoanRequest.CoApplicantIncome);
    parameters.push(req.body.HomeLoanRequest.CoApplicantObligations);
    parameters.push(req.body.HomeLoanRequest.CoApplicantDOB);
    parameters.push(req.body.HomeLoanRequest.Turnover);
    parameters.push(req.body.HomeLoanRequest.ProfitAfterTax);
    parameters.push(req.body.HomeLoanRequest.Depreciation);
    parameters.push(req.body.HomeLoanRequest.DirectorRemuneration);
    parameters.push(req.body.HomeLoanRequest.CoApplicantTurnover);
    parameters.push(req.body.HomeLoanRequest.CoApplicantProfitAfterTax);
    parameters.push(req.body.HomeLoanRequest.CoApplicantDepreciation);
    parameters.push(req.body.HomeLoanRequest.CoApplicantDirectorRemuneration);
    parameters.push(req.body.HomeLoanRequest.empcode);
    parameters.push(req.body.HomeLoanRequest.BrokerId);
    parameters.push(req.body.HomeLoanRequest.ProductId);
    parameters.push(req.body.HomeLoanRequest.bank_id);
    parameters.push(req.body.HomeLoanRequest.roi_type);
    parameters.push(req.body.HomeLoanRequest.loan_eligible);
    parameters.push(req.body.HomeLoanRequest.processing_fee);
    parameters.push(req.body.HomeLoanRequest.api_source);
    parameters.push(req.body.HomeLoanRequest.created_at);
    parameters.push(req.body.HomeLoanRequest.updated_at);
    parameters.push(req.body.FBA_id);
    parameters.push(req.body.HomeLoanRequest.LoaniD);
    parameters.push(req.body.HomeLoanRequest.Type);
    parameters.push(req.body.HomeLoanRequest.quote_id);
    parameters.push(req.body.HomeLoanRequest.CoApplicantName);
    parameters.push(req.body.HomeLoanRequest.CoApplicantRelation);
    return parameters;
}

//   if(req.body._id){
//     console.log('has id');
//       Loan.update({"_id": req.body._id}, {
//         $set: {"RequestString" : req.body.RequestString,
//               "FBAId":req.body.FBAId, 
//               "LoanId":req.body.LoanId, 
//               "Type":req.body.Type,         
//               "Name":req.body.Name, 
//               "LoanAmount":req.body.LoanAmount, 
//               "IsActive":req.body.IsActive}
//             }, function(err, result){
//               if(err)
//                  base.send_response('Failure', null,res);  
//               else{
//                   base.send_response('Saved successfully', [],res); 
//                  // getAllUser(req.body.FBAId,function(data) {
//                  // if(data.length>0){
//                  //        base.send_response('Success', data,res);               
//                  //      }
//                  //      else{
//                  //           base.send_response('Failure', null,res);  
//                  //      }
//                  //  });
//               }
//               console.log("result:"+result);
//       });
//       //console.log('Has ID');
//   }
//   else{
//     req.body.Status = "Quote";
//     var loan = new Loan(req.body);
//     loan.save(function(err) {
//     if (err) {
//       console.log(err);
//        base.send_response('Failure', null,res);  
//     };
//     base.send_response('Saved successfully', [],res); 
//     // getAllUser(req.body.FBAId,function(data) {
//     //    if(data.length>0){
//     //           base.send_response('Success', data,res);               
//     //         }
//     //         else{
//     //              base.send_response('Failure', null,res);  
//     //         }
//     // });
//       console.log('Data saved successfully!');
//     });
// }
  

var setQuoteToApplication = function(req, res, next) {
  var parameters = [];
    parameters.push(req.body.loan_requestID);
    con.execute_proc('call QuoteToApplicationLoan(?)',parameters,function(data) {
    console.log(data[0][0]);
    if(data[0][0].SavedStatus=="0"){
      base.send_response("Success", data[0],res);
    }
    else{
      base.send_response("Failure",null,res);
    }
  });
}

var getLoanData = function(req, res, next) {
  getAllLoanData(req.body.fbaid,req.body.type,req.body.count,req.body.QandAType,res,req);
}

var deleteLoanRequestById = function(req, res, next) {
  var parameters = [];
    parameters.push(req.body.loan_requestID);
    con.execute_proc('call DeleteLoanRequestLoan(?)',parameters,function(data) {
    console.log(data[0][0]);
    if(data[0][0].SavedStatus=="0"){
      base.send_response("Success", data[0],res);
    }
    else{
      base.send_response("Failure",null,res);
    }
  });
}

function getAllLoanData(fbaid,type,count,QandAType,res,req){
  var parameters = [];
  if(fbaid){
    parameters.push(fbaid);
  }
  else{
   parameters.push(null); 
  }

  if(type){
    parameters.push(type);
  }
  else{
   parameters.push(null); 
  }

  if(count){
    parameters.push(count);
  }
  else{
   parameters.push(0); 
  }

  if(QandAType){
    parameters.push(QandAType);
  }
  else{
   parameters.push(0); 
  }


  console.log(parameters);
  // parameters.push(type);

if(QandAType == 0)
{
   con.execute_proc('call getLoanRequest(?,?,?,?)',parameters,function(data) {
    var quoteresponse = [];
    var applicationresponse = [];
    for (var i = 0; i < data[0].length; i++) {
      data[0][i].progress_image = null;
      var response = {
        "loan_requestID" : data[0][i].loan_requestID,
        "FBA_id" : data[0][i].FBA_id,        
        "HomeLoanRequest" : data[0][i]
      };
      quoteresponse.push(response);
    }
    for (var i = 0; i < data[1].length; i++) {
      console.log(data[1][i].StatusPercent);
      data[1][i].progress_image = handler.validateimage(req,data[1][i].StatusPercent);
      var response = {
        "loan_requestID" : data[1][i].loan_requestID,
        "FBA_id" : data[1][i].FBA_id,
        "HomeLoanRequest" : data[1][i]
      };
      applicationresponse.push(response);
    }
  var responsedata = {"quote":quoteresponse,"application":applicationresponse};
    base.send_response("Success", responsedata,res);
});
}

else if(QandAType == 1)
{
    con.execute_proc('call getLoanRequest(?,?,?,?)',parameters,function(data) {
    var quoteresponse = [];
    for (var i = 0; i < data[0].length; i++) {
      data[0][i].progress_image = null;
      var response = {
        "loan_requestID" : data[0][i].loan_requestID,
        "FBA_id" : data[0][i].FBA_id,        
        "HomeLoanRequest" : data[0][i]
      };
      quoteresponse.push(response);
    }
    var responsedata = {"quote":quoteresponse,"application":[]};
    base.send_response("Success", responsedata,res);
  });
}

else if(QandAType == 2)
{
    con.execute_proc('call getLoanRequest(?,?,?,?)',parameters,function(data) {
    var applicationresponse = [];
    for (var i = 0; i < data[0].length; i++) {
      console.log(data[0][i].StatusPercent);
      data[0][i].progress_image = handler.validateimage(req,data[0][i].StatusPercent);
      var response = {
        "loan_requestID" : data[0][i].loan_requestID,
        "FBA_id" : data[0][i].FBA_id,
        "HomeLoanRequest" : data[0][i]
      };
      applicationresponse.push(response);
    }
  var responsedata = {"quote":[],"application":applicationresponse};
    base.send_response("Success", responsedata,res);
  });
}

else
{
   base.send_response("Failure type not match",null,res);
}
}

module.exports = {"saveLoanData" :saveLoanData , "getLoanData": getLoanData , "deleteLoanRequestById" : deleteLoanRequestById, "setQuoteToApplication" : setQuoteToApplication};
