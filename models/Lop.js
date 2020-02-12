var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'Lop', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var Lop = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenLop: {type:mongoose.Schema.Types.ObjectId, ref:'tenLop'},
    viTri: String
},schemaOptions)

module.exports = mongoose.model("Lop", Lop);

