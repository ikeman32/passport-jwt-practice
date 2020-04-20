const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require(`morgan`);
const passport = require('passport');



//route to endpoint routers
const configureRoutes = require("../routes/router");

const server = express();

server.use(helmet());
server.use(morgan("combined"));
server.use(express.json());
server.use(passport.initialize());
require('../middleware/passport')(passport);
require('../middleware/passport-facebook')(passport);
require('../middleware/passport-google')(passport);
server.use(cors());

// Configure view engine to render EJS templates.
server.set('views', __dirname + '../views');
server.set('view engine', 'ejs');

server.use(require('cookie-parser')());
server.use(require('body-parser').urlencoded({ extended: true }));
server.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
server.use(passport.initialize());
server.use(passport.session());

configureRoutes(server);

server.get("/", (req, res) => {
  res.send("The Server is working ");
});

module.exports = server;