var HocKyModel = require('../models/HocKy');

function SelectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    try {
        HocKyModel.find({}, (err, result) => {
            if (err)
                throw (err);
            res.json(result);
        }).skip(parseInt(start)).limit(parseInt(length));
    }
    catch (err) {
        throw (err);
    }
}

function SelectByID(req, res) {
    HocKyModel.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
}

function Insert(req, res) {
    let HocKy = new HocKyModel({
        tenHocKy: req.body.tenHocKy,
    });
    HocKy.save((err) => {
        if (err) {
            throw (err);
        }
        res.json('HocKy insert successfully');
    })
}

function Update(req, res) {
    console.log(req.params.id);
    HocKyModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) {
            console.log(err);
        }
        res.send('HocKy udpated.');
    });
}

function Delete(req, res) {
    HocKyModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}

module.exports = {
    SelectByID: SelectByID,
    SelectAll: SelectAll,
    Insert: Insert,
    Update: Update,
    Delete: Delete,
}