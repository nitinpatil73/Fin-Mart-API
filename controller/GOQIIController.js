var base=require('./baseController');
var wrapper = require('./wrapper.js');

class GOQII{};

var LoginDetails = function(req, res, next) {

    var healthrequest={};
    
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.Password = req.body.Password;
    console.log(req.body.Password);

    wrapper('/LeadGenration.svc/LoginDetails', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        // if(Encoderesponse != null && Encoderesponse != ''){
        //     base.send_response("Success",Encoderesponse,res);
        // }else{
        //     base.send_response("Broker Id does not exist","",res);
        // }

},25);
};


var UpdateProfile = function(req, res, next) {

    var healthrequest={};
    healthrequest.Address = req.body.Address;
    healthrequest.City = req.body.City;
    healthrequest.EmailID = req.body.EmailID;
    healthrequest.ID = req.body.ID;
    healthrequest.LMAccountManager = req.body.LMAccountManager;
    healthrequest.LeadInterest = req.body.LeadInterest;
    healthrequest.Location = req.body.Location;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.Name = req.body.Name;
    healthrequest.PartnerChildLogin = req.body.PartnerChildLogin;
    healthrequest.PartnerLogin = req.body.PartnerLogin;
    healthrequest.Password = req.body.Password;
    healthrequest.Pincode = req.body.Pincode;
    healthrequest.ReferenceCode = req.body.ReferenceCode;
    healthrequest.State = req.body.State;
   
    wrapper('/LeadGenration.svc/UpdateProfile', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        
},25);
};

var MotorLead = function(req, res, next) {

    var healthrequest={};
    healthrequest.EmailID = req.body.EmailID;
    healthrequest.MakeID = req.body.MakeID;
    healthrequest.ManufacturingDate = req.body.ManufacturingDate;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.ModelID = req.body.ModelID;
    healthrequest.NCB = req.body.NCB;
    healthrequest.Name = req.body.Name;
    healthrequest.PartnerChildLogin = req.body.PartnerChildLogin;
    healthrequest.PolicyExpiryDate = req.body.PolicyExpiryDate;
    healthrequest.RegistrationNo = req.body.RegistrationNo;
    healthrequest.RelationshipWithOwner = req.body.RelationshipWithOwner;
    healthrequest.RelativeMobileNo = req.body.RelativeMobileNo;
    healthrequest.RelativeName = req.body.RelativeName;
    healthrequest.Remarks = req.body.Remarks;
    healthrequest.SubModelID = req.body.SubModelID;
    healthrequest.UserID = req.body.UserID;
    healthrequest.VehicleTypeID = req.body.VehicleTypeID;
   
    wrapper('/LeadGenration.svc/MotorLead', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        
},25);
};

var HealthLead = function(req, res, next) {

    var healthrequest={};
    healthrequest.Category = req.body.Category;
    healthrequest.City = req.body.City;
    healthrequest.CurrentYearInsCmpID = req.body.CurrentYearInsCmpID;
    healthrequest.DOB = req.body.DOB;
    healthrequest.EmailID = req.body.EmailID;
    healthrequest.ExistingDisease = req.body.ExistingDisease;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.Name = req.body.Name;
    healthrequest.OtherExistingDisease = req.body.OtherExistingDisease;
    healthrequest.PartnerChildLogin = req.body.PartnerChildLogin;
    healthrequest.PolicyExpiryDate = req.body.PolicyExpiryDate;
    healthrequest.ProposalType = req.body.ProposalType;
    healthrequest.Remarks = req.body.Remarks;
    healthrequest.UserID = req.body.UserID;
    
   
    wrapper('/LeadGenration.svc/HealthLead', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        
},25);
};


var LifeLead = function(req, res, next) {

    var healthrequest={};
    healthrequest.City = req.body.City;
    healthrequest.DOB = req.body.DOB;
    healthrequest.EmailID = req.body.EmailID;
    healthrequest.InvestmentPlan = req.body.InvestmentPlan;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.Name = req.body.Name;
    healthrequest.PartnerChildLogin = req.body.PartnerChildLogin;
    healthrequest.Remarks = req.body.Remarks;
    healthrequest.UserID = req.body.UserID;
    
   
    wrapper('/LeadGenration.svc/LifeLead', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        
},25);
};

var LoanLead = function(req, res, next) {

    var healthrequest={};
    healthrequest.BusinessLoanAmount = req.body.BusinessLoanAmount;
    healthrequest.CCEmployeeType = req.body.CCEmployeeType;
    healthrequest.CarMakeID = req.body.CarMakeID;
    healthrequest.CarMfgDate = req.body.CarMfgDate;
    healthrequest.CarModelID = req.body.CarModelID;
    healthrequest.CarType = req.body.CarType;
    healthrequest.ExistingBusinessLoanAmount = req.body.ExistingBusinessLoanAmount;
    healthrequest.HomeLoanAmount = req.body.HomeLoanAmount;
    healthrequest.HomeLoanCityName = req.body.HomeLoanCityName;
    healthrequest.HomeLoantype = req.body.HomeLoantype;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.Name = req.body.Name;
    healthrequest.PLAmount = req.body.PLAmount;
    healthrequest.PLDispatchDate = req.body.PLDispatchDate;
    healthrequest.PLEmployeeType = req.body.PLEmployeeType;
    healthrequest.PartnerChildLogin = req.body.PartnerChildLogin;
    healthrequest.Products = req.body.Products;
    healthrequest.Remarks = req.body.Remarks;
    healthrequest.UserID = req.body.UserID;
    healthrequest.isBusinessExistingLoan = req.body.isBusinessExistingLoan;
   
    wrapper('/LeadGenration.svc/LoanLead', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        
},25);
};


var OtherLead = function(req, res, next) {

    var healthrequest={};
    healthrequest.CategoryID = req.body.CategoryID;
    healthrequest.CompanyName = req.body.CompanyName;
    healthrequest.InsuredName = req.body.InsuredName;
    healthrequest.IsNew = req.body.IsNew;
    healthrequest.MobileNo = req.body.MobileNo;
    healthrequest.Name = req.body.Name;
    healthrequest.PartnerChildLogin = req.body.PartnerChildLogin;
    healthrequest.ProductID = req.body.ProductID;
    healthrequest.Remarks = req.body.Remarks;
    healthrequest.RenewalDate = req.body.RenewalDate;
    healthrequest.TravelCountry = req.body.TravelCountry;
    healthrequest.TravelDate = req.body.TravelDate;
    healthrequest.UserID = req.body.UserID;
   
    wrapper('/LeadGenration.svc/OtherLead', 'POST',healthrequest,function(Encoderesponse) {
        res.send(Encoderesponse)
        
},25);
};



module.exports = {"LoginDetails":LoginDetails, "UpdateProfile" : UpdateProfile,"MotorLead" : MotorLead, "HealthLead":HealthLead, "LifeLead" : LifeLead, "LoanLead" : LoanLead,"OtherLead" : OtherLead };