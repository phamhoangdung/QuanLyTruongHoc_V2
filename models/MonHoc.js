var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'MonHoc', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var MonHoc = mongoose.Schema({
    tenMonHoc: {type: mongoose.Schema.Types.ObjectId, ref:'tenMonHoc'},
    HocKy_idHocKy: { type: mongoose.Schema.Types.ObjectId, ref: 'HocKy' }
}, schemaOptions)

module.exports = mongoose.model("MonHoc", MonHoc);