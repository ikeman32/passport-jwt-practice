require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      // options for facebook strategy
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ facebookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            facebookId: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.image.url,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
