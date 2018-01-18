
var wrapper = require('./wrapper.js');
var response_status = require('./responsestatus');
var base=require('./baseController');



var smarthealth = function(req, res, next) {
wrapper('/quotes/api/SmartHealth', 'POST', {
    CityID: req.body.CityID,
    ContactEmail: req.body.ContactEmail,
    ContactMobile: req.body.ContactMobile,
    ContactName: req.body.ContactName,
    DeductibleAmount: req.body.DeductibleAmount,
    ExistingCustomerReferenceID: req.body.ExistingCustomerReferenceID,
    HealthType: req.body.HealthType,
    MaritalStatusID: req.body.MaritalStatusID,
    MemberList: req.body.MemberList,
    PolicyFor: req.body.PolicyFor,
    PolicyTermYear: req.body.PolicyTermYear,
    ProductID: req.body.ProductID,
    SessionID: req.body.SessionID,
    SourceType: req.body.SourceType,
    SumInsured: req.body.SumInsured,
    SupportsAgentID: req.body.SupportsAgentID

  }, function(data) {
    console.log(data);
  	if(data!=null){
	  	base.send_response(data, res);
  	}
  	else{
  		base.send_response(data, res);
  	}
  },2);
}

// router.post('/vehicle-info', function(req, res, next) {
// // console.log(req.body.RegistrationNumber);
// // res.send("asf");



// });

module.exports = smarthealth;