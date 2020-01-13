var mongoose = require('mongoose');

var Lop = mongoose.Schema({
    tenLop: String,
    viTri: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
},{collection:'Lop'})

module.exports = mongoose.model("Lop", Lop);

