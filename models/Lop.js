var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'Lop', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var Lop = mongoose.Schema({
    tenLop: {type : mongoose.Schema.Types.ObjectId, ref :'tenLop'},
    viTri: {type: mongoose.Schema.Types.ObjectId, ref: 'viTri'}
},schemaOptions)

module.exports = mongoose.model("Lop", Lop);

