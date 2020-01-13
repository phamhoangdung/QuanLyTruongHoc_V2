var mongoose = require('mongoose');

var GiaoVienDayLop = mongoose.Schema({
    Lop_idLop: Number,
    GiaoVien_idGiaoVien: Number,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
},{collection:'GiaoVienDayLop'})

module.exports = mongoose.model("GiaoVienDayLop", GiaoVienDayLop);