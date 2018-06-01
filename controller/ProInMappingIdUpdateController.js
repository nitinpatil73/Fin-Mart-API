var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var ProInMapping_Id = function(req, res, next) {
  var ProInMapping_IdParameter = [];
      ProInMapping_IdParameter.push(req.body.termRequestId); 
  	  ProInMapping_IdParameter.push(req.body.fba_id); 
  	  ProInMapping_IdParameter.push(req.body.Existing_ProductInsuranceMapping_Id);
  	  con.execute_proc('call Product_Insurance_MappingId_Update(?,?,?)',ProInMapping_IdParameter,function(responce) {
      if(responce[0][0].SavedStatus=="0"){
        base.send_response("Updated successfully.", responce[0],res);
      }
      else{
        base.send_response("Failure",null,res);
      }
  });
};


module.exports = {"ProInMapping_Id":ProInMapping_Id}