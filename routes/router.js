// IMPORTS
const authRouter = require("../auth/auth-router.js");
const googleRouter = require('../google-routes/google-router');
const facebookRouter = require('../facebook-routes/facebook-router');
    
module.exports = server => {
  server.use("/api/auth", authRouter);
  server.use("/api/google", googleRouter);
  server.use("/api/facebook", facebookRouter);
};