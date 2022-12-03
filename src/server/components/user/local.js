// User registration
function signup(req, res) {
    if (config.features.disableSignUp === true)
        return res.redirect("/");

    // req.assert("name", req.t("NameCannotBeEmpty")).notEmpty();
    // req.assert("email", req.t("EmailCannotBeEmpty")).notEmpty();
    // req.assert("email", req.t("EmailIsNotValid")).isEmail();
    // req.sanitize("email").normalizeEmail({ remove_dots: false });

    //req.assert("username", req.t("UsernameCannotBeEmpty")).notEmpty();
    
    if (!req.body.username)
        req.body.username = req.body.email;

    // req.sanitize("passwordless").toBoolean();
    let passwordless = req.body.passwordless === true;
    if (!passwordless) {
        // req.assert("password", req.t("PasswordCannotBeEmpty")).notEmpty();
        // req.assert("password", req.t("PasswordTooShort")).len(6);
    }

    // let errors = req.validationErrors();
    let errors = null;
    if (errors) {
        req.flash("error", errors);
        return res.redirect("/signup");
    }

    async.waterfall([

        function generateVerificationToken(done) {
            if (config.features.verificationRequired) {
                crypto.randomBytes(25, function(err, buf) {
                    done(err, err ? null : buf.toString("hex"));
                });
            } else {
                done(null, null);
            }
        },

        function passwordlessToken(token, done) {
            if (passwordless) {
                crypto.randomBytes(25, function(err, buf) {
                    done(err, token, err ? null : buf.toString("hex"));
                });
            }
            else
                done(null, token, req.body.password);
        },

        function createUser(token, password, done) {

            let user = new User({
                fullName: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: password,
                passwordLess: passwordless,
                roles: [C.ROLE_USER],
                provider: "local"
            });

            if (token && config.mailer.enabled) {
                // user email verification is only enabled if mailer is enabled
                user.verified = false;
                user.verifyToken = token;
            } else {
                user.verified = true;
            }

            user.save(function(err, user) {
                if (err && err.code === 11000) {
                    let field;
                    if(err.message.includes(".$")) {
                        field = err.message.split(".$")[1];
                    }
                    else if (err.message.includes("index: ")) {
                        field = err.message.split("index: ")[1];
                    }
                    else {
                        req.flash("error", { msg: req.t("UserSaveError") });
                        done(err, user);
                        return
                    }
                    field = field.split(" dup key")[0];
                    field = field.substring(0, field.lastIndexOf("_"));						
                    if (field == "email")
                        req.flash("error", { msg: req.t("EmailIsExists") });
                    else 
                        req.flash("error", { msg: req.t("UsernameIsExists") });
                }
                done(err, user);
            });
        },

        function sendEmail(user, done) {
            if (!config.mailer.enabled) {
                logger.error("config.mailer not enabled; emailing skipped. Have you configured mailer yet?");
                return done(null, user);
            }
            if (user.verified) {
                // Send welcome email
                let subject = req.t("mailSubjectWelcome", config);

                res.render("mail/welcome", {
                    name: user.fullName
                }, function(err, html) {
                    if (err)
                        return done(err);

                    mailer.send(user.email, subject, html, function(err, info) {
                        //if (err)
                        //	req.flash("error", { msg: "Unable to send email to " + user.email});

                        done(null, user);
                    });
                });	

            } else {
                // Send verification email
                let subject = req.t("mailSubjectActivate", config);

                res.render("mail/accountVerify", {
                    name: user.fullName,
                    validateLink: "http://" + req.headers.host + "/verify/" + user.verifyToken
                }, function(err, html) {
                    if (err)
                        return done(err);

                    mailer.send(user.email, subject, html, function(err, info) {
                        if (err)
                            req.flash("error", { msg: req.t("UnableToSendEmail", user) });
                        else
                            req.flash("info", { msg: req.t("emailSentVerifyLink")});


                        done(err, user);
                    });
                });					
            }
        }

    ], function(err, user) {
        if (err) {
            logger.error(err);
            return res.redirect("back");
        }

        if (user.verified) {
            req.login(user, function(err) {
                if (err)
                    logger.error(err);

                return res.redirect("/");
            });
        }
        else
            res.redirect("/login");
    });
}  

// Forgot password
function forgot(req, res) {
    // req.assert("email", req.t("EmailIsNotValid")).isEmail();
    // req.assert("email", req.t("EmailCannotBeEmpty")).notEmpty();
    // req.sanitize("email").normalizeEmail({ remove_dots: false });
    
    // let errors = req.validationErrors();
    let errors = null;
    if (errors) {
        req.flash("error", errors);
        return res.redirect("back");
    }	

    async.waterfall([

        function generateToken(done) {
            crypto.randomBytes(25, function(err, buf) {
                done(err, err ? null : buf.toString("hex"));
            });
        },

        function getUserAndSaveToken(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash("error", { msg: req.t("EmailNotAssociatedToAccount", req.body) });
                    return done(`Email address ${req.body.email} is not registered!`);
                }

                // Check that the user is not disabled or deleted
                if (user.status !== 1) {
                    req.flash("error", { msg: req.t("UserDisabledOrDeleted")});
                    return done(req.t("UserDisabledOrDeleted"));
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // expire in 1 hour
                user.save(function(err) {
                    done(err, token, user);
                });					
            });
        },

        function sendResetEmailToUser(token, user, done) {
            if (!config.mailer.enabled) {
                const err = "Trying to send email without config.mailer enabled; emailing skipped. Have you configured mailer yet?";
                logger.error(err);
                return done(err, user);
            }
            let subject = req.t("mailSubjectResetPassword", config);

            res.render("mail/passwordReset", {
                name: user.fullName,
                resetLink: "http://" + req.headers.host + "/reset/" + token
            }, function(err, html) {
                if (err)
                    return done(err);
                
                mailer.send(user.email, subject, html, function(err, info) {
                    if (err)
                        req.flash("error", { msg: req.t("UnableToSendEmail", user) });
                    else
                        req.flash("info", { msg: req.t("emailSentPasswordResetLink", user) });

                    done(err);
                });
            });
        }

    ], function(err) {
        if (err)
            logger.error(err);

        res.redirect("back");
    });
}	

module.exports = {signup, forgot}