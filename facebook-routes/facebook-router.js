const router = require("express").Router();
const passport = require("passport");

router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/facebook", passport.authenticate("facebook", {
    scope: ["profile"],
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile");
  }
);

module.exports = router;
