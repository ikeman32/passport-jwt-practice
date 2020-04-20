require('dotenv').config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // installed this
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

/* passport usage

const passport = require('passport');

To protect an individual route
router.method('/path', passport.authenticate('jwt', {session: false}), (req,res) => ... );

To protect a group of routes
app.use('/path', passport.authenticate('jwt', {session:false}),require('path/to/route/file'));
*/

const User = require("../models/auth-model");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, SALT_ROUNDS); // 2 ^ n
  user.password = hash;

  User.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // sign token
        const token = signToken(user); // new line

        // send the token
        res.status(200).json({
          token, // added token as part of the response sent
          message: `Welcome User ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// this functions creates and signs the token
function signToken(user) {
  const payload = {
    username: user.username,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options); // notice the return
}

module.exports = router;