var Loan = require('../model/loanmodel.js');
var base = require('./baseController');

var saveLoanData = function(req, res, next) {

console.log('sdfdsfsd');
  if(req.body._id){
    console.log('has id');
      Loan.update({"_id": req.body._id}, {
        $set: {"RequestString" : req.body.RequestString,
              "FBAId":req.body.FBAId, 
              "LoanId":req.body.LoanId, 
              "Type":req.body.Type, 
              "Status":req.body.Status, 
              "Name":req.body.Name, 
              "LoanAmount":req.body.LoanAmount, 
              "IsActive":req.body.IsActive}
            }, function(err, result){
              if(err)
                 base.send_response('Failure', null,res);  
              else{
                 getAllUser(req.body.FBAId,function(data) {
                 if(data.length>0){
                        base.send_response('Success', data,res);               
                      }
                      else{
                           base.send_response('Failure', null,res);  
                      }
                  });
              }
              console.log("result:"+result);
      });
      //console.log('Has ID');
  }
  else{
    console.log('safsdfdsfdsdsgdfg');
    var loan = new Loan(req.body);
    loan.save(function(err) {
    if (err) {
      console.log(err);
       base.send_response('Failure', null,res);  
    };
    getAllUser(req.body.FBAId,function(data) {
       if(data.length>0){
              base.send_response('Success', data,res);               
            }
            else{
                 base.send_response('Failure', null,res);  
            }
    });
      console.log('Data saved successfully!');
    });
}
  
	
}

var getLoanDataByFbaId = function(req, res, next) {

		getAllUser(req.body.FBAId,function(data) {
			 if(data.length>0){
              base.send_response('Success', data,res);               
            }
            else{
                 base.send_response('Failure', null,res);  
            }
		});
}

var deleteLoanRequestById = function(req, res, next) {

Loan.deleteOne({
	"_id" : req.body._id
}).then(function(result) {
  console.log(result);
});
}

function getAllUser(fbaid,callback){
	console.log('fbaid'+fbaid);
Loan.find({ FBAId: fbaid }, function(err, loan) {
  if (err) {
		base.send_response(err, null,res);  
  };
  callback(loan);
});
}

module.exports = {"saveLoanData" :saveLoanData , "getLoanDataByFbaId": getLoanDataByFbaId , "deleteLoanRequestById" : deleteLoanRequestById};
