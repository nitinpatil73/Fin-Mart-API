var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongo_conn=require('../bin/mongo_conn.js');
mongoose.connect(mongo_conn, { autoIndex: false });

var CacheSchema = new Schema({
    error: Object
});

//mongoose.model('CacheSchema', CacheSchema);
var ErrorLog = mongoose.model('ErrorLog', CacheSchema);
module.exports=ErrorLog;
