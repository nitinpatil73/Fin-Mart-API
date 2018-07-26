var wrapper = require('./wrapper.js');
var base=require('./baseController');


var rblplcalc = function(req, res, next) {

 wrapper('/api/rbl-pl-calc', 'POST', {

	"LnAmt":req.body.LnAmt,
	"TnrMths":req.body.TnrMths,
	"IRR":req.body.IRR

  }, function(data) {
   //console.log(data);
   base.send_response("success",data,res);
  },12);

}

module.exports = {"rblplcalc":rblplcalc}