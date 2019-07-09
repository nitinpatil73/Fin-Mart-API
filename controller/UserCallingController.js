var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var UserCalling = function(req, res, next) {

var parameter = [];

  if(req.body.fbaid){
    

      con.execute_proc('call getcallingstructure(?)',req.body.fbaid,function(datanew) {


      if(datanew[0][0].SavedStatus == 0)
      {
         var l1 = "";
    var lvtwo = "";
    var l3 = "";
    var l4 = "";
    var l5 = "107124";
   // var l6 = "112056";
    var lf = "";
     l1 = datanew[0][0].rrm;
     lvtwo = datanew[0][0].clusthead;
    // console.log(lvtwo);
     l3 =datanew[0][0].statehead;
     l4 =datanew[0][0].zonalhead;
      if (l1 !== null  && l1 !== '')
    {
      lf = l1;
    }
     if(lvtwo !== null  && lvtwo !== '')
    {
      //console.log("df");
      lf = lf + "," + lvtwo;
    }
    if(l3 !== null  && l3 !== '')
    {
      //console.log("df");
      lf = lf + "," + l3;
    }
    if(l4 !== null  && l4 !== '')
    {
      //console.log("df");
      lf = lf + "," + l4;
    }
    if(l5 !== null  && l5 !== '')
    {
      //console.log("df");
      lf = lf + "," + l5;
    }
   //  if(l6 !== null  && l6 !== '')
  //  {
      //console.log("df");
   //   lf = lf + "," + l6;
  //  }

var myarray = lf.split(',');

var myarrayfinal = "";
for(var i = 0; i < myarray.length; i++)
{
   if(i == 0)
   {
    myarrayfinal = myarray[i];
    
   }
  else
  {
  
   if(i <= 2)
   {
     myarrayfinal = myarrayfinal + "," + myarray[i];
   }
    }
   

}

var finalarr = myarrayfinal.split(',');

var myfinalarr = "";
var myleadsection = [];
var leadsection = "";

console.log(finalarr);
var parameternew = [];


  parameternew.push(finalarr[0]);
  parameternew.push(finalarr[1]);
  parameternew.push(finalarr[2]);

    
  con.execute_proc('call sp_getempdetialsbyuidforstr(?,?,?)',parameternew,function(finaldata){

   base.send_response("Success", finaldata[0],res);

  });

      
      }
      else{
            base.send_response("Failure", "",res);  
      }
});
  
  }
  else{
     base.send_response("Failure", "",res);  
  }
};



module.exports = {"UserCalling" :UserCalling}

