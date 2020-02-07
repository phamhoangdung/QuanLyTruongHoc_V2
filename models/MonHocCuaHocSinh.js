var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'MonHocCuaHocSinh', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var MonHocCuaHocSinh = mongoose.Schema({
    HocSinh_idHocSinh: {type : mongoose.Schema.Types.ObjectId,ref : 'HocSinh'},
    MonHoc_idMonHoc: {type : mongoose.Schema.Types.ObjectId,ref : 'MonHoc'},
},schemaOptions)

module.exports = mongoose.model("MonHocCuaHocSinh", MonHocCuaHocSinh);