var mysql  = require('mysql');
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'Back_Office'
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
module.exports = connection;

//uses ---------------------------------------------------

//  query="select name from user where email='"+email+"' and pwd='"+pwd+"'";
//  //console.log(con);
//  con.execute_query(query,function(results){
//      name=results[0]?results[0].name:"";
//      callback(name);
//  });

//--------------------------------------------------------