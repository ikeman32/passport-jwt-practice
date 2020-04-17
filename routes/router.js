// IMPORTS
const authRouter = require("../auth/auth-router.js");
    
module.exports = server => {
  server.use("/api/auth", authRouter);
};