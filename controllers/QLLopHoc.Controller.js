var LopModel = require('../models/Lop');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var total = await LopModel.count((err, result) => {
        return result;
    })
    try {
        LopModel.find({}, (err, result) => {
            if (err)
                res.json({ err: 1, msg: err });
            res.json({ "recordsTotal": result.length, "recordsFiltered": total, "data": result, "draw": req.body.draw });
        }).skip(parseInt(start)).limit(parseInt(length));
    }
    catch (err) {
        res.json({ err: 1, msg: err });
    }
}

async function create(req, res) {
    let Lop = new LopModel({
        tenLop: req.body.tenLop,
        viTri: req.body.viTri,
        trangThai: req.body.trangThai
    });
    Lop.save((err) => {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'Lop create successfully' });
    })
}

async function update(req, res) {
    console.log(req.body);
    
    LopModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'Lop update successfully' });
    });
}

function remove(req, res) {
    LopModel.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'Lop remove successfully' });
    })
}

module.exports = {
    selectAll: selectAll,
    create: create,
    update: update,
    remove: remove
}