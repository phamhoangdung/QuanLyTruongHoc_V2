var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'GiaoVien', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var GiaoVien = mongoose.Schema({
    tenGiaoVien: String,
    ngaySinh: Date,
    diaChi: String,
},schemaOptions);
module.exports = mongoose.model("GiaoVien", GiaoVien);
