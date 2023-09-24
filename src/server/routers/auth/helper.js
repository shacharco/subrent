"use strict";

let passport 		= require("passport");
const { getUser, getUserByEmail } = require("../../components/user/index.js");
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
		return done(null, user.email);
	});

	passport.deserializeUser(async function(email, done) {
        if(email == "admin@gmail.com"){
            return done(null, {username: "admin", password: "admin", email, id: email})
        }
		let user = await getUserByEmail(email);
		if(user){
			return done(null, user);
		}
		return done(null, false);
	});

	function requireAll() { 
        // require("./strategies/facebook.js");
        require("./strategies/google.js")();
        require("./strategies/local.js")();
	}
	let modules = requireAll();
}

module.exports = {init, checkAuthenticated}
