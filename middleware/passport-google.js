require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/return'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({id: profile.id}).then((currentUser) => {
      if(currentUser) {
        console.log('user is:', currentUser)
        done(null, currentUser);
      } else {
          new User({
            id: profile.id,
            username: profile.displayName
          }).save().then((newUser) => {
            console.log('new user created:', + newUser);
            done(null, newUser);
          })
      }
    })
  }));
