// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongo_conn=require('../bin/mongo_conn.js');
mongoose.connect(mongo_conn, { autoIndex: false });
var timestamps = require('mongoose-timestamp');
var RequestSchema = new Schema({
    FBAId: Number,
    RequestString: Object,
    LoanId: Number,
    Type: String,
    Status: String,
    Name: String,
    LoanAmount: Number,
    IsActive: Boolean
});
RequestSchema.plugin(timestamps);
var Loan = mongoose.model('Loan', RequestSchema);
module.exports = Loan;
