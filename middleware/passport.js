require("dotenv").config();
const { Strategy, ExtractJwt } = require("passport-jwt");

const secret = process.env.JWT_SECRET;

const User = require("../models/auth-model");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, {
              id: user.id,
              username: user.username,
            });
          }
          return done(null, false);
        })
        .catch((err) => console.error(err));
    })
  );
};
