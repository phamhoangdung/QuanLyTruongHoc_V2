var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'MonHocCuaHocSinh', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var MonHocCuaHocSinh = mongoose.Schema({
    HocSing_idHocSinh: Number,
    MonHoc_idMonHoc: Number,
    creat_at: { type: Date, default: Date.now },
    update_at: { type: Data, default: Date.now }
},schemaOptions)

module.exports = mongoose.model("MonHocCuaHocSinh", MonHocCuaHocSinh);