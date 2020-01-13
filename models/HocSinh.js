var mongoose = require('mongoose');

var HocSinh = mongoose.Schema({
    tenHocSinh: String,
    queQuan: String,
    gioiTinh: String,
    Lop_idLop: Number,
    TaiKhoan_idTaiKhoan: Number, 
    creat_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
},{collection:'HocSinh'})
module.exports = mongoose.model('HocSinh', HocSinh);
