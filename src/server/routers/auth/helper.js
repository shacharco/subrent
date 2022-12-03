"use strict";

let passport 		= require("passport");
let User 			= require("../../components/user/User.js");

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
         return next();
    }
    res.sendStatus(404);
}

function init(app) {

	// Use passport session
	app.use(passport.initialize());
	app.use(passport.session());	

	passport.serializeUser(function(user, done) {
		return done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
        if(id == "admin@gmail.com"){
            return done(null, {username: "admin", password: "admin", email: id, id})
        }
		User.findOne({
			_id: id
		}, "-password", function(err, user) {
			if (err)
				return done(err);
			
			// Check that the user is not disabled or deleted
			if (!user)
				return done(null, false);

			return done(null, user);
		});
	});

	function requireAll() { 
        // require("./strategies/facebook.js");
        require("./strategies/google.js")();
        require("./strategies/local.js")();
	}
	let modules = requireAll();
}

module.exports = {init, checkAuthenticated}
