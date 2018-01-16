// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongo_conn=require('../bin/mongo_conn.js');
mongoose.connect(mongo_conn, { autoIndex: false });
var timestamps = require('mongoose-timestamp');
var CacheSchema = new Schema({
    data: Object
    
});
CacheSchema.plugin(timestamps);
//mongoose.model('CacheSchema', CacheSchema);
var Cache = mongoose.model('Cache', CacheSchema);
module.exports=Cache;
