var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'TrinhDoCuaGiaoVien', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var TrinhDoCuaGiaoVien = mongoose.Schema({
    TrinhDo_idTrinhDo: Number,
    GiaoVien_idGiaoVien: Number,
    create_at: { type: Date, default: Date.now }
},schemaOptions)

module.exports = mongoose.model("TrinhDoCuaGiaoVien", TrinhDoCuaGiaoVien);

