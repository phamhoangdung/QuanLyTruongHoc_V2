var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'HocSinh', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var HocSinh = mongoose.Schema({
    ten: String,
    ho: String,
    ngaySinh: Date,
    diaChi: String,
    gioiTinh: Number,
    Lop_idLop: { type: mongoose.Schema.Types.ObjectId, ref: 'Lop' },
    // TaiKhoan_idTaiKhoan: { type: mongoose.Schema.Types.ObjectId, ref: 'TaiKhoan' },
}, schemaOptions)
module.exports = mongoose.model('HocSinh', HocSinh);
