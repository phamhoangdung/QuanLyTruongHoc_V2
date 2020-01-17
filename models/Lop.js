var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'Lop', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var Lop = mongoose.Schema({
    tenLop: String,
    viTri: String
},schemaOptions)

module.exports = mongoose.model("Lop", Lop);

