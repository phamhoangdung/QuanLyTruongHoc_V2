var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'Diem', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var Diem = new mongoose.Schema({
    tenLop: String,
    viTri: String,
},schemaOptions)

module.exports = mongoose.model("Diem", Diem);