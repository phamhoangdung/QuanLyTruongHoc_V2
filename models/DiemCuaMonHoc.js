var mongoose = require('mongoose');

var DiemCuaMonHoc = mongoose.Schema({
    Diem_idDiem: Number,
    MonHoc_idMonHoc: Number,
    ccreat_at: { type: Date, default: Date.now },
    update_at: { type: Data, default: Date.now }
},{collection:'DiemCuaMonHoc'})
module.exports = mongoose.model("DiemCuaMonHoc", DiemCuaMonHoc);