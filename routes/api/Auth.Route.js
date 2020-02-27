module.exports = function (app, passport) {
    app.route('/login')
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