var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'HocKy', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var HocKy = mongoose.Schema({
    tenHocKy: String,
},schemaOptions)

module.exports = mongoose.model("HocKy", HocKy);