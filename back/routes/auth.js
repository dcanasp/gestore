const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


const GOOGLE_CLIENT_ID = '397345771127-5hetto2pimku66lfcp9kguti9vu9upng.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   

      return done(null, profile);
    }
  
));

passport.serializeUser(function(user, done) {
    done(null, user);

});

passport.deserializeUser(function(user, done) {
    done(null, user);

});