var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var GetLoanID = function (req, res, next) {
   var fba_req_id = [];
   fba_req_id.push(req.body.FBAID);
  con.execute_proc('call getdatatoloanid(?)',fba_req_id,function(response) {
    if(response!=null){
           // base.send_response("Success",response,res);
              wrapper('/LoginDtls.svc/xmlservice/insFbaRegistrationForDC', 'POST', {
            FBAID : response[0][0].FBAID,
            FirstName : response[0][0].FirstName,
            LastName : response[0][0].LastName,
            DOB : response[0][0].DOB,
            Mobile_1 : response[0][0].Mobile_1,
            Mobile_2 : response[0][0].Mobile_2,
            EmailId : response[0][0].EmailId,

            Address_1 : response[0][0].Address_1,
            Address_2 : response[0][0].Address_2,
            Address_3 : response[0][0].Address_3,
            PinCode : response[0][0].PinCode,
            City : response[0][0].City,
            State : response[0][0].State,

            IsLic : response[0][0].IsLic,
            LIC_Comp : response[0][0].LIC_Comp,
            IsGic : response[0][0].IsGic,
            GIC_Comp : response[0][0].GIC_Comp,
            IsHealth :response[0][0].IsHealth,
            Health_Comp : response[0][0].Health_Comp,
            MF : response[0][0].MF,
            MF_Comp : response[0][0].MF_Comp,
            Stock : response[0][0].Stock,
            Stock_Comp : response[0][0].Stock_Comp,
            Postal : response[0][0].Postal,
            Postal_Comp : response[0][0].Postal_Comp,
            Bonds : response[0][0].Bonds,
            Bonds_Comp : response[0][0].Bonds_Comp,

            Posp_FirstName : response[0][0].Posp_FirstName,
            Posp_LastName : response[0][0].Posp_LastName,
            Posp_PAN : response[0][0].Posp_PAN,
            Posp_Aadhaar : response[0][0].Posp_Aadhaar,
            Posp_BankAcNo : response[0][0].Posp_BankAcNo,
            Posp_Account_Type : response[0][0].Posp_Account_Type,
            Posp_IFSC : response[0][0].Posp_IFSC,
            Posp_MICR : response[0][0].Posp_MICR,
            Posp_BankName : response[0][0].Posp_BankName,
            Posp_BankBranch : response[0][0].Posp_BankBranch,
            Posp_BankCity : response[0][0].Posp_BankCity,

            Loan_FirstName : response[0][0].Loan_FirstName,
            Loan_LastName : response[0][0].Loan_LastName,
            Loan_PAN : response[0][0].Loan_PAN,
            Loan_Aadhaar : response[0][0].Loan_Aadhaar,
            Loan_BankAcNo : response[0][0].Loan_BankAcNo,
            Loan_Account_Type : response[0][0].Loan_Account_Type,
            Loan_IFSC : response[0][0].Loan_IFSC,
            Loan_MICR : response[0][0].Loan_MICR,
            Loan_BankName : response[0][0].Loan_BankName,
            Loan_BankBranch : response[0][0].Loan_BankBranch,
            Loan_BankCity : response[0][0].Loan_BankCity,
            fromrb : 1,
      }, function(data) {
       // console.log(data);
        if(data.statusId == 0){
           //base.send_response("Success",data,res); 
          UpdateLoanId(req.body.FBAID,data.result,req,res,next);
        }
        else{
        var loan = new RBLog({ FBAId: FBAID,RequestString:req.body,IsActive:true });
        loan.save(function(err) {
          if(err){
           // console.log(err);
          };
        });
        }
      },3);
    }else{
         base.send_response("failure",null,res);
    }

  });
};

  function UpdateLoanId(FBAID,LoanId,req, res, next) {
      var fbausers = [];
      fbausers.push(FBAID); //p_FBAID        INT,
      fbausers.push(LoanId); 
      con.execute_proc('call UpdateLoanId(?,?)',fbausers,function(loandata) {
       // console.log("--------------");
        //console.log(loandata);
        if(loandata.SavedStatus == 0){
      //  console.log(loandata);
         base.send_response(loandata[0].Message,loandata[0],res); 
        }else{
          base.send_response(loandata[0].Message,loandata[0],res); 
        }
      });
      // console.log(personal);
    }
module.exports = {
"GetLoanID":GetLoanID,
};