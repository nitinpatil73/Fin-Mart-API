var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'Back_Office'
      });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//route to authenticate user
router.post('/authenticate', function(req, res, next) {
     check_auth(req.body.email,req.body.pwd,function (data){
         error=data?"":"No User Found";
         status=data?1:0;
         result={'status':status,'name':data,'error':error};
         res.send(result);
     }); 
});
//check authentication
function check_auth(email,pwd,callback){
  query="select name from user where email='"+email+"' and pwd='"+pwd+"'";
  execute_query(query,function(results){
      name=results[0]?results[0].name:"";
      callback(name);
  });
}
//pass the query to execute
function execute_query(query,callback){
    connection.connect();
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      callback(results);
    });
    connection.end();
}
//export the module
module.exports = router;
