 var mysql  = require('mysql');
var connection = mysql.createConnection({
      //----------------------local-----------------
        // host     : 'localhost',
        // user     : 'root',
        // password : '',
        // database : 'backoffice'
        
      //  ----------------------qa----------------
        // host     : '35.154.94.67',
        // user     : 'finmart_user',
        // password : 'finmart@321',
        // database : 'BackOffice'

         // -------------preprod--------------
         // host     : '52.66.161.224',
         // user     : 'finmart_user',
         // password : 'finmart@0909',
         // database : 'BackOffice'
      });
//pass the query to execute
connection.execute_query=function (query,callback){
    //connection.connect();
    connection.query(query, function (error, results, fields) {
      if (error) {throw error;}
      callback(results);
    });
    //connection.end();
};
connection.execute_proc=function (proc_call,params,callback){
    connection.query(proc_call, params, function(err, result) { 
      if (err) throw err; 
      //console.log(result); 
      callback(result);
});
};

module.exports=connection;
//uses ---------------------------------------------------

//  query="select name from user where email='"+email+"' and pwd='"+pwd+"'";
//  //console.log(con);
//  con.execute_query(query,function(results){
//      name=results[0]?results[0].name:"";
//      callback(name);
//  });

//--------------------------------------------------------