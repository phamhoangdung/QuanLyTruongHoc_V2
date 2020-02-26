var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'DiemCuaMonHoc', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var DiemCuaMonHoc = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    Diem_idDiem: { type: mongoose.Schema.Types.ObjectId, ref: 'Diem' },
    MonHoc_idMonHoc: { type: mongoose.Schema.Types.ObjectId, ref: 'MonHoc' },
}, schemaOptions)
module.exports = mongoose.model("DiemCuaMonHoc", DiemCuaMonHoc);

//thay đổi db , không dùng tới