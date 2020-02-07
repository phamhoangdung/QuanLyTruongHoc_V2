var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'HocSinh', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var HocSinh = mongoose.Schema({
    tenHS: String,
    hoHS: String,
    ngaySinhHS: Date,
    diaChiHS: String,
    gioiTinhHS: Number,
    Lop_idLop: { type: mongoose.Schema.Types.ObjectId, ref: 'Lop' },
    // TaiKhoan_idTaiKhoan: { type: mongoose.Schema.Types.ObjectId, ref: 'TaiKhoan' },
}, schemaOptions)
module.exports = mongoose.model('HocSinh', HocSinh);
