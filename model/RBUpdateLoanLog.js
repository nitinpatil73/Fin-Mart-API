// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongo_conn=require('../bin/mongo_conn.js');
mongoose.connect(mongo_conn, { autoIndex: false });
var timestamps = require('mongoose-timestamp');
var RequestSchema = new Schema({
    FBAId: Number,
    RequestString: Object,
    IsActive: Boolean
});
RequestSchema.plugin(timestamps);
var RBLog = mongoose.model('RBLoanIDLog', RequestSchema);
module.exports = RBLog;
