var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const schemaOptions = {
    collection: 'Diem', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var Diem = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    HocSinh_idHocSinh: {type: mongoose.Schema.Types.ObjectId, ref:'HocSinh'},
    MonHoc_idMonHoc: {type: mongoose.Schema.Types.ObjectId, ref:'MonHoc'},
    diem15_lan1:Float,
    diem15_lan2: Float,
    diem15_lan3: Float,
    diem1tiet_lan1:Float,
    diem1tiet_lan2: Float,
    diem1tiet_lan3: Float,
    diemThiHK:Float,
},schemaOptions)

module.exports = mongoose.model("Diem", Diem);