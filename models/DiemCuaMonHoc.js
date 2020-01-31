var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'DiemCuaMonHoc', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var DiemCuaMonHoc = mongoose.Schema({
    Diem_idDiem: { type: mongoose.Schema.Types.ObjectId, ref: 'Diem' },
    MonHoc_idMonHoc: { type: mongoose.Schema.Types.ObjectId, ref: 'MonHoc' },
    ccreat_at: { type: Date, default: Date.now },
    update_at: { type: Data, default: Date.now }
}, schemaOptions)
module.exports = mongoose.model("DiemCuaMonHoc", DiemCuaMonHoc);