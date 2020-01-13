var mongoose = require('mongoose');

var Diem = new mongoose.Schema({
    tenLop: String,
    viTri: String,
    creat_at: { type: Date, default: Date.now },
    update_at: { type: Data, default: Date.now }
},{collection:'Diem'})

module.exports = mongoose.model("Diem", Diem);