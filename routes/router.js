// IMPORTS
const authRouter = require("../auth/auth-router.js");
//const googleRouter = require('../google-routes/google-router');
//const gProfile = require('../google-routes/gProfile_routes');
const facebookRouter = require('../facebook-routes/facebook-router');
const fbProfile = require('../facebook-routes/fbProfile_routes');
    
module.exports = server => {
  server.use("/api/auth", authRouter);
  //server.use("/api/google", googleRouter);
  //server.use('/api/google/profile', gProfile);
  server.use("/api/facebook", facebookRouter);
  server.use('/api/facebook/profile', fbProfile);

};