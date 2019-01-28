var base=require('./baseController');
var wrapper = require('./wrapper.js');



var getHealthLead = function(req, res, next) {

    var healthrequest={};
    healthrequest.Name = req.body.Name;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.EmailID = req.body.EmailID;
    healthrequest.DOB = req.body.DOB;
    healthrequest.City = req.body.City;
    healthrequest.ProposalType = req.body.ProposalType;
    healthrequest.Category = req.body.Category;
    healthrequest.PolicyExpiryDate = req.body.PolicyExpiryDate;
    healthrequest.ExistingDisease = req.body.ExistingDisease;
    healthrequest.OtherExistingDisease = req.body.OtherExistingDisease;
    healthrequest.CurrentYearInsCmpID = req.body.CurrentYearInsCmpID;
    healthrequest.ChaindID = req.body.ChaindID;
    healthrequest.UserID = req.body.UserID;
    wrapper('/LeadGenration.svc/HealthLead', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        // if(Encoderesponse != null && Encoderesponse != ''){
        //     base.send_response("Success",Encoderesponse,res);
        // }else{
        //     base.send_response("Broker Id does not exist","",res);
        // }

},25);
};



module.exports = {"getHealthLead":getHealthLead};