var mongoose = require('mongoose');

var TrinhDoCuaGiaoVien = mongoose.Schema({
    TrinhDo_idTrinhDo: Number,
    GiaoVien_idGiaoVien: Number,
    create_at: { type: Date, default: Date.now }
},{collection:'TrinhDoCuaGiaoVien'})

module.exports = mongoose.model("TrinhDoCuaGiaoVien", TrinhDoCuaGiaoVien);

