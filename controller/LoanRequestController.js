var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');
var handler = require('./HandlerController');

var loanrequest = function(req, res, next)
{
		 try 
     {

      if(req.body.FBAID && req.body.Name && req.body.LeadId && req.body.ProductType)
      {
            var addtoloanrequestparameter = [];
	        							
        		addtoloanrequestparameter.push(req.body.Name);
        		addtoloanrequestparameter.push(req.body.LoanAmount);
        		addtoloanrequestparameter.push(req.body.AppDate);       	 		
       	 		addtoloanrequestparameter.push(req.body.Status);
        		addtoloanrequestparameter.push(req.body.BankId);
        		addtoloanrequestparameter.push(req.body.BankUrl);
            addtoloanrequestparameter.push(req.body.FBAID); 
       	 		addtoloanrequestparameter.push(req.body.ProductType);
       	 		addtoloanrequestparameter.push(req.body.LeadId);
        		addtoloanrequestparameter.push(req.body.MobileNo);
        	  addtoloanrequestparameter.push(req.body.BankName);
       	 	
              console.log(addtoloanrequestparameter);
        		con.execute_proc('call sp_Addtoloanrequest(?,?,?,?,?,?,?,?,?,?,?)',
								 addtoloanrequestparameter,function(dataresponce)
			 						{
		
			 						});		



			  	base.send_response("Sucess","Sucess",res);	
      }
      else
      {
          base.send_response("Some Data Missing", "",res);
      }
     }
          catch (ex) 
          {
             console.log(ex);
            base.send_response("Failure",null,res);  
          }
			 

}


var getloanrequest = function(req, res, next)
{
     try 
     {

      if(req.body.FBAID && req.body.Type)
      {
            var addtoloanrequestparameter = [];
                        
            addtoloanrequestparameter.push(req.body.FBAID);
            addtoloanrequestparameter.push(req.body.Count);
            addtoloanrequestparameter.push(req.body.Type);                                               
            con.execute_proc('call getAllLoanRequest(?,?,?)',
             addtoloanrequestparameter,function(dataresponce)
              {
                  base.send_response("Sucess",dataresponce[0],res);               
              });   



           
      }
      else
      {
          base.send_response("Some Data Missing", "",res);
      }
     }
          catch (ex) 
          {
             console.log(ex);
            base.send_response("Failure",null,res);  
          }
       

}



var updateLSLoanStatus = function(req, res, next)
{
     try 
     {
        if(req.body.leadid && req.body.isaccepted)
        {
              var addtoloanrequestparameter = [];
                          
              addtoloanrequestparameter.push(req.body.leadid);
              addtoloanrequestparameter.push(req.body.isaccepted);                                                          
              con.execute_proc('call updateLSstatusforloan(?,?)',
               addtoloanrequestparameter,function(data){
                if(data[0][0].SavedStatus == 0){                
                    base.send_response("Success", data[0],res);
                }
                else{
                  base.send_response(data[0][0].Message, "",res);        
                }        
        });             
      }
      else
      {
          base.send_response("Some Data Missing", "",res);
      }
    }
        catch (ex) {          
          base.send_response(ex,null,res);  
        }
      
}

var getloanleaddataforrb = function(req, res, next)
{
     try 
     {
        if(req.body.leadid)
        {
              var addtoloanrequestparameter = [];
                          
              addtoloanrequestparameter.push(req.body.leadid);
              con.execute_proc('call getloanleaddataforrb(?)',
               addtoloanrequestparameter,function(data){
                if(data[0][0].SavedStatus == 0){                
                    base.send_response(data[0][0].Message, data[0],res);
                }
                else{
                  base.send_response(data[0][0].Message, "",res);        
                }        
        });             
      }
      else
      {
          base.send_response("Please pass lead id", "",res);
      }
    }
        catch (ex) {          
          base.send_response(ex,null,res);  
        }
       

}



module.exports = {"loanrequest":loanrequest,"getloanrequest" : getloanrequest,"updateLSLoanStatus":updateLSLoanStatus,"getloanleaddataforrb":getloanleaddataforrb};