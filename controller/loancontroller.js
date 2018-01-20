var Loan = require('../model/loanmodel.js');
var base=require('./baseController');

var saveLoanData = function(req, res, next) {

	var loan = new Loan(req.body);
	loan.save(function(err) {

	if (err) {
		response_status.failure_response(err,'Failure',function (return_data) {
                          res.send(return_data);
                });
	};
		getAllUser(req.body.FBAId,function(data) {
			 if(data.length>0){
              base.send_response('Success', data,res);               
            }
            else{
                 base.send_response('Failure', null,res);  
            }

			//res.send(data);
		});
	    console.log('Data saved successfully!');
	});
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

		// getAllUser(req.body.FBAId,function(data) {
		// 	 if(data.length>0){
  //               response_status.success_response(data,'Success',function (return_data) {
  //                         res.send(return_data);
  //               });
  //           }
  //           else{
  //                response_status.failure_response(null,'Failure',function (return_data) {
  //                         res.send(return_data);
  //               });
  //           }
		// });
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
