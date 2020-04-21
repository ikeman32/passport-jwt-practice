require('dotenv').config();
const express = require("express");
const cookiesession = require('cookie-session');
const helmet = require("helmet");
const cors = require("cors");
const morgan = require(`morgan`);
const passport = require('passport');
const passport_jwt = require('../middleware/passport');
const passport_facebook = require('../middleware/passport_facebook');
//const passport_google = require('../middleware/passport-google')(passport);


//route to endpoint routers
const configureRoutes = require("../routes/router");

const server = express();

// set view engine
server.set('view engine', 'ejs');

// set up session cookies
server.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_SECRET]
}));

server.use(helmet());
server.use(morgan("combined"));
server.use(express.json());
server.use(passport.initialize());
server.use(passport.session());
server.use(passport_jwt);
server.use(passport_facebook);
//server.use(passport_google);
server.use(cors());

server.use(configureRoutes);

server.get("/", (req, res) => {
  res.send("The Server is working ");
});

module.exports = server;