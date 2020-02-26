var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const schemaOptions = {
    collection: 'TaiKhoan', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
var TaiKhoan = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
    password: {
        type: String,
        required: true,
      },
    role: Number,
}, schemaOptions);

module.exports = mongoose.model("TaiKhoan", TaiKhoan);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
module.exports.isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}
module.exports.encrypt = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                reject(err);
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
    })
}