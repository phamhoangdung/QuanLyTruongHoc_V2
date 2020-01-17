var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'HocSinh', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var HocSinh = mongoose.Schema({
    tenHocSinh: String,
    queQuan: String,
    gioiTinh: String,
    Lop_idLop: mongoose.Schema.Types.ObjectId,
    TaiKhoan_idTaiKhoan: mongoose.Schema.Types.ObjectId, 
    creat_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
},schemaOptions)
module.exports = mongoose.model('HocSinh', HocSinh);
