var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'GiaoVienDayLop', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var GiaoVienDayLop = mongoose.Schema({
    Lop_idLop: {type : mongoose.Schema.Types.ObjectId,ref : 'Lop'},
    GiaoVien_idGiaoVien: {type : mongoose.Schema.Types.ObjectId,ref : 'GiaoVien'},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
},schemaOptions)

module.exports = mongoose.model("GiaoVienDayLop", GiaoVienDayLop);