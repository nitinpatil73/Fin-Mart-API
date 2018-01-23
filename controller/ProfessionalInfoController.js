var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var insurancecompany = function(req, res, next) {


con.execute_proc('call GetProfessionalInfoInuranceCompany()',null,function(data) {
// console.log(data);
var responsedata = {"lifeinsurance":data[0],"generalinsurance":data[1],"healthinsurance":data[2]};

base.send_response("Success", responsedata,res);
});

};

module.exports  = insurancecompany;
