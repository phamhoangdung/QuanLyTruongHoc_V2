module.exports = function (app, passport) {
    app.route('/login')
        .get(function (req, res) {
            res.render('Admin/LoginView', {title:'login' , message: req.flash('loginMessage') });
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/admin',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}