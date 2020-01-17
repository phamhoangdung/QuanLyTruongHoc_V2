var mongoose = require('mongoose');
const schemaOptions = {
    collection: 'TrinhDo', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var TrinhDo = mongoose.Schema({
    tenTrinhDo: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
},schemaOptions);

module.exports = mongoose.model("TrinhDo", TrinhDo);