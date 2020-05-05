var TaiKhoanModel = require('../models/TaiKhoan');

async function selectAll(req, res) {
    var start = req.body.start == null ? 0 : req.body.start;
    var length = req.body.length == null ? 5 : req.body.length;
    var total = await TaiKhoanModel.count((err, result) => {
        return result;
    })
    try {
        TaiKhoanModel.find({}, (err, result) => {
            if (err)
                res.json({ err: 1, msg: err });
            res.json({ "recordsTotal": result.length, "recordsFiltered": total, "data": result, "draw": req.body.draw });
        }).sort({ created_at: -1 }).skip(parseInt(start)).limit(parseInt(length));
    }
    catch (err) {
        res.json({ err: 1, msg: err });
    }
}

function getProfileByID(req, res) {

}
async function checknum(username) {
    var checknum = await TaiKhoanModel.find({ username: username }).count();
    return checknum;
}
async function create(req, res) {
    let TaiKhoan = new TaiKhoanModel({
        username: req.body.username,
        password: await TaiKhoanModel.encrypt(req.body.password),
        role: req.body.role,
    });
    console.log(req.body.username);
    console.log("=>" + await checknum(req.body.username));
    if ((await checknum(req.body.username)) == 0) {
        TaiKhoan.save((err) => {
            if (err)
                return res.json({ err: 1, msg: err });
            res.json({ err: 0, msg: 'Tai khoan create successfully' });
        })
    }
    // res.json({ err: 1, msg: "err" })
}

async function update(req, res) {
    if (req.body.password) {
        req.body.password = await TaiKhoanModel.encrypt(req.body.password);
    }
    var update = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    }
    TaiKhoanModel.findByIdAndUpdate(req.params.id, update, function (err, product) {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'Tai khoan update successfully' });
    });
}

function remove(req, res) {
    TaiKhoanModel.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({ err: 1, msg: err });
        res.json({ err: 0, msg: 'Tai khoan remove successfully' });
    })
}

module.exports = {
    selectAll: selectAll,
    getProfileByID: getProfileByID,
    create: create,
    update: update,
    remove: remove
}