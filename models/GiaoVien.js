var mongoose = require('mongoose');

var GiaoVien = mongoose.Schema({
    tenGiaoVien: String,
    ngaySinh: Date,
    diaChi: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
},{collection:'GiaoVien'});
module.exports = mongoose.model("GiaoVien", GiaoVien);
