const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require(`morgan`);
const passport = require('passport');



//route to endpoint routers
const configureRoutes = require("../routes/router");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use(passport.initialize());
require('../middleware/passport')(passport);
server.use(cors());

configureRoutes(server);

server.get("/", (req, res) => {
  res.send("The Server is working ");
});

module.exports = server;