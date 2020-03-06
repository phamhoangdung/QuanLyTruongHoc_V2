var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'GiaoVien', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var GiaoVien = mongoose.Schema({
    ho: String,
    ten: String,
    ngaySinh: Date,
    diaChi: String,
    MonHoc_idMonHoc : {type: mongoose.Schema.Types.ObjectId, ref:'MonHoc'},
    Lop_idLop : {type: mongoose.Schema.Types.ObjectId, ref:'Lop'},
},schemaOptions);
module.exports = mongoose.model("GiaoVien", GiaoVien);
