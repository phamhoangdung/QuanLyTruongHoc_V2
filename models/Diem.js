var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const schemaOptions = {
    collection: 'Diem', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var Diem = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dangSo: Float,
    dangChu: String,
    loaiDiem: String
},schemaOptions)

module.exports = mongoose.model("Diem", Diem);