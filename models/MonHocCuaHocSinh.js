var mongoose = require('mongoose');

var MonHocCuaHocSinh = mongoose.Schema({
    HocSing_idHocSinh: Number,
    MonHoc_idMonHoc: Number,
    creat_at: { type: Date, default: Date.now },
    update_at: { type: Data, default: Date.now }
},{collection:'MonHocCuaHocSinh'})

module.exports = mongoose.model("MonHocCuaHocSinh", MonHocCuaHocSinh);