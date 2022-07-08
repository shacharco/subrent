const express = require('express');
const passport = require("passport");

const router = express.Router();

router.post('/auth/google',function(req, res, next) {
  console.log(req.url);
  console.log(req.headers);
  console.log(req.body)
  passport.authenticate('local', function(err, user, info) {
      console.log("authenticate");
      console.log(err);
      console.log(user);
      console.log(info);
      // res.redirect("/");
  })(req, res, next);
});
// passport.authenticate('local', {successRedirect: "/find", failureRedirect: "/login"})

// passport.authenticate('google', { scope: [ 'email', 'profile' ]})
// );

router.get("/auth/local/callback", (req, res, next) => {
  console.log("callback")
  passport.authenticate("local", (err, user, info) => {
    console.log("redirect")
    return res.redirect("/");
  })(req, res, next);

});

router.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;   
        res.redirect(returnTo || "/");
      });
    })(req, res, next);
  });


router.get("/logout", (req,res) => {
    req.logOut()
    res.redirect("/find")
 })
 
 module.exports = router;