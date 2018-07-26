
var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var ExpressLoanParameter = function(req, res, next) {
 con.execute_proc('call Express_Loan()',null,function(data) {
  if(data != null){
  	var responsedata = {"PersonalLoan":data[0],"HomeLoan":data[1],"BusinessLoan":data[2],"ShortTermPersonalLoan":data[3]};
    base.send_response("Success",responsedata,res);
  }
  else{
      base.send_response("Failure", "",res);        
  }
});

}



module.exports = {"ExpressLoanParameter" :ExpressLoanParameter};