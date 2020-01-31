var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'TrinhDoCuaGiaoVien', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var TrinhDoCuaGiaoVien = mongoose.Schema({
    TrinhDo_idTrinhDo: { type: mongoose.Schema.Types.ObjectId, ref: 'TrinhDo' },
    GiaoVien_idGiaoVien: Number,
    create_at: { type: Date, default: Date.now }
}, schemaOptions)

module.exports = mongoose.model("TrinhDoCuaGiaoVien", TrinhDoCuaGiaoVien);

