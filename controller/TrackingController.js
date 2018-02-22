var base=require('./baseController');
var Log  = require('../model/LogModel.js');

var insertTracking = function(req, res, next) {
	console.log("hit");
	var loan = new Log({ FBAId: req.body.FBAID, RequestString : req.body.Data, Type :req.body.Type });
		loan.save(function(err) {
			if(err){
				base.send_response("failed", null,res);		
			}
			else{
				base.send_response("saved", "saved",res);
			}
		});
};


module.exports = insertTracking;