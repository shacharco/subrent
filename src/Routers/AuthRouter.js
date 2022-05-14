const express = require('express');
const passport = require("passport");

const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));


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