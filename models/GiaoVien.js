var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'GiaoVien', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var GiaoVien = mongoose.Schema({
    tenGiaoVien: String,
    ngaySinh: Date,
    diaChi: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
},schemaOptions);
module.exports = mongoose.model("GiaoVien", GiaoVien);
