var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'DiemCuaMonHoc', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var DiemCuaMonHoc = mongoose.Schema({
    Diem_idDiem: mongoose.Schema.Types.ObjectId,
    MonHoc_idMonHoc: mongoose.Schema.Types.ObjectId,
    ccreat_at: { type: Date, default: Date.now },
    update_at: { type: Data, default: Date.now }
},schemaOptions)
module.exports = mongoose.model("DiemCuaMonHoc", DiemCuaMonHoc);