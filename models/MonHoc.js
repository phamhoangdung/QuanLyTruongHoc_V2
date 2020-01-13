var mongoose = require('mongoose');

var MonHoc = mongoose.Schema({
    tenMonHoc: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
},{collection:'MonHoc'})

module.exports = mongoose.model("MonHoc", MonHoc);