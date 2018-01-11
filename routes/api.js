var express = require('express');
var router = express.Router();
var con=require('../bin/dbconnection.js');
var User = require('../model/user.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Calling Api........');
});
//route to authenticate user
router.post('/authenticate', function(req, res, next) {
     check_auth(req.body.email,req.body.pwd,function (data){
         error=data?"":"Come on now! Stop kidding, Enter correct email and password.";
         status=data?1:0;
         result={'status':status,'name':data,'error':error};
         res.send(result);
     }); 
});
//check authentication
function check_auth(email,pwd,callback){
User.find({ username: email,password:pwd }, function(err, user) {
  if (err) throw err;

  // object of the user
  console.log(user);
  callback(user[0]?user[0].name:"");
});
}
//register the user
function register_user(name,email,pwd){
    // create a new user called chris
//var user_detail = new User({
//  name: 'Chris',
//  username: email,
//  password: pwd 
//});

// call the custom method. this will just add -dude to his name
// user will now be manish-dude
//user_detail.dudify(function(err, name) {
//  if (err) throw err;
//
//  console.log('Your new name is ' + name);
//});

// call the built-in save method to save to the database
//user_detail.save(function(err) {
//  if (err) throw err;
//
//  console.log('User saved successfully!');
//});
}
module.exports = router;
