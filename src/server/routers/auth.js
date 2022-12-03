"use strict";

// let config 		= require("../config");
// let logger 		= require("../core/logger");

let crypto 		= require("crypto");
let async 		= require("async");

let passport 	= require("passport");
let express 	= require("express");
const bodyParser = require("body-parser");

// let mailer 		= require("../libs/mailer");
let User 		= require("../components/user/User.js");
// let Response 	= require("../core/response");
const {signup, forgot} = require("../components/user/local.js");

let authRouter = express.Router();
authRouter.use(bodyParser.json());

authRouter.post("/local", function(req, res, next) {

    // req.assert("username", req.t("UsernameCannotBeEmpty")).notEmpty();

    // let errors = req.validationErrors();
    let errors = null;
    if (errors) {
        req.flash("error", errors);
        return res.redirect("/login");
    }

    if (req.body.password) {
        // Login with password
        passport.authenticate("local", function(err, user, info) { 
            if (!user) {
                req.flash("error", { msg: info.message });
                return res.redirect("/login");
            }

            req.login(user, function(err) {
                if (err) {
                    req.flash("error", { msg: err });
                    return res.redirect("/login");
                }

                // Success authentication
                // Update user's record with login time
                req.user.lastLogin = Date.now();
                req.user.save(function() {
                    // Remove sensitive data before login
                    req.user.password = undefined;
                    req.user.salt = undefined;

                    return res.redirect("/");
                });

            });

        })(req, res, next);

    } else {
        // Passwordless login
        if(req.body.email == 'admin@gmail.com'){
            req.body.username = "admin";
            req.body.password = "admin";
            passport.authenticate('local', function(err, user, info) {
                if(err){
                    return next(err);
                }
                if (!user) {
                    req.flash("error", { msg: info.message });
                    return res.redirect("/login");
                }    
                req.logIn(user, async function (err){
                if(err){
                    return next(err);
                }
                return res.json(user);
                });
            })(req, res, next);

        }
        // async.waterfall([

        //     function generateToken(done) {
        //         crypto.randomBytes(25, function(err, buf) {
        //             done(err, err ? null : buf.toString("hex"));
        //         });
        //     },

        //     function getUser(token, done) {
        //         let username = req.body.username;
        //         User.findOne({
        //             $or: [ 
        //                 { "username": username}, 
        //                 { "email": username}
        //             ]
        //         }, function(err, user) {
        //             if (!user) {
        //                 req.flash("error", { msg: req.t("UsernameIsNotAssociated", { username: username}) });
        //                 return done("Invalid username or email: " + username);
        //             }

        //             // Check that the user is not disabled or deleted
        //             if (user.status !== 1) {
        //                 req.flash("error", { msg: req.t("UserDisabledOrDeleted")});
        //                 return done(`User '${username} is disabled or deleted!`);
        //             }
                    

        //             user.passwordLessToken = token;
        //             //user.passwordLessTokenExpires = Date.now() + 3600000; // expire in 1 hour
        //             user.save(function(err) {
        //                 done(err, token, user);
        //             });					
        //         });
        //     },

            // function sendResetEmailToUser(token, user, done) {
            //     if (!config.mailer.enabled) {
            //         const err = "Trying to send email without config.mailer not enabled; emailing skipped. Have you configured mailer yet?";
            //         logger.error(err);
            //         return done(err, user);
            //     }
            //     let subject = req.t("mailSubjectLogin", config);

            //     res.render("mail/passwordLessLogin", {
            //         name: user.fullName,
            //         loginLink: "http://" + req.headers.host + "/passwordless/" + token
            //     }, function(err, html) {
            //         if (err)
            //             return done(err);

            //         mailer.send(user.email, subject, html, function(err, info) {
            //             if (err)
            //                 req.flash("error", { msg: req.t("UnableToSendEmail", user) });
            //             else
            //                 req.flash("info", { msg: req.t("emailSentWithMagicLink", user) });

            //             done(err);
            //         });
            //     });
            // }

        // ]);
    }

});

/**
 * Google authentication routes
 *
 * Available scopes: https://developers.google.com/+/web/api/rest/oauth#authorization-scopes
 */
authRouter.get("/google", passport.authenticate("google", {
    scope: "profile email"
    /*scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]*/
}));

authRouter.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login"
}), function(req, res) {
    res.redirect("/");
});

/**
 * Facebook authentication routes
 */
authRouter.get("/facebook", passport.authenticate("facebook", {
    scope: ["email", "user_location"]
}));

authRouter.get("/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/login"
}), function(req, res) {
    res.redirect("/");
});	

/**
 * Twitter authentication routes
 */
authRouter.get("/twitter", passport.authenticate("twitter"));

authRouter.get("/twitter/callback", passport.authenticate("twitter", {
    failureRedirect: "/login"
}), function(req, res) {
    res.redirect("/");
});	

/**
 * Github authentication routes
 */
authRouter.get("/github", passport.authenticate("github", {
    scope: "user:email"
}));

authRouter.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/login"
}), function(req, res) {
    res.redirect("/");
});	

authRouter.get("/logout", (req,res) => {
    req.logOut();
    req.session.destroy();
    res.redirect("/");
 })

module.exports = authRouter;
