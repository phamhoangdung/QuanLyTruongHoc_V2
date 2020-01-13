var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/TaiKhoan');

module.exports = async function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ username: username }, function (err, userResult) {
                if (err)
                    return done(err);
                if (!userResult) {
                    console.log('==============> No user found.');
                    req.flash('message', 'User Not found.');
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (!User.isValidPassword(userResult, password)) {
                    console.log('==============> Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                return done(null, userResult);
            })
        }
    )
    );
};