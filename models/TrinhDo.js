var mongoose = require('mongoose');

var TrinhDo = mongoose.Schema({
    tenTrinhDo: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
},{collection:'TrinhDo'});

module.exports = mongoose.model("TrinhDo", TrinhDo);