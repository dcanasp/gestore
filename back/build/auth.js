"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fun = () => {
    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth2').Strategy;
    const GOOGLE_CLIENT_ID = '799274898302-rr6nkh5e0uo7tgr70t42i5i56017ujgl.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = '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';
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/GOOGLE/google/callback",
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};
fun();
exports.default = fun;
