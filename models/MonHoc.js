var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'MonHoc', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var MonHoc = mongoose.Schema({
    tenMonHoc: String,
    HocKy_idHocKy: mongoose.Schema.Types.ObjectId
},schemaOptions)

module.exports = mongoose.model("MonHoc", MonHoc);