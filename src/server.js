var yaml_config = require('js-yaml');
var fs = require('fs');
const path = require('path');
var config = yaml_config.load(fs.readFileSync(path.join(__dirname, '..', 'config.yml')));
const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const expressSession = require("express-session");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const LocalStrategy = require( 'passport-local' ).Strategy;

const app = express();
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new GoogleStrategy({
//     clientID:     config.GOOGLE_CLIENT_ID,
//     clientSecret: config.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback",
//     passReqToCallback   : true
//   }, (request, accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//   }
// ));

passport.use(new LocalStrategy( {
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'email'
},
    (user, password, done) => {
        console.log("local stra");
      return done(null, {username: "admin", email: "admin@mail.com"});
  }
));
// passport.use(new LocalStrategy({  
//     callbackURL: "/auth/local/callback",
//     passReqToCallback   : true
//     }, (user, password, done) => {
//         console.log("local stra")
//       return done(null, {username: "admin", email: "admin@mail.com"});
//   }
// ));

passport.serializeUser((user, done) => {
    console.log("serial")
    done(null, user)
 });
passport.deserializeUser((user, done) => {
    console.log("deserial")
    done (null, user)
});

for(routerName of fs.readdirSync(path.join(__dirname, config.routers))){
    console.log(routerName);
    let router = require(path.join(__dirname, config.routers, routerName))
    app.use(router);
}

app.use('/public/', express.static(path.join(__dirname, '/public')));


app.listen(config.port);
