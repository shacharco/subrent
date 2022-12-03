var yaml_config = require('js-yaml');
var fs = require('fs');
const path = require('path');
var config = yaml_config.load(fs.readFileSync(path.join(__dirname, 'config.yml')));
const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const expressSession = require("express-session");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const LocalStrategy = require( 'passport-local' ).Strategy;
const db = require("./db/db.js");
const UsersSchema = require("./components/user/schemas/UsersSchema.js");

const app = express();

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID:     config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
  }, (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
  }
));

passport.use(new LocalStrategy( {
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'email',
},
    async function(user, password, done) {
        let existingUser = await db.getOneByField("email", user, UsersSchema);
        if(!existingUser){
            existingUser = await db.create(user, UsersSchema);
        }  
        return done(null, {_id: existingUser._id, username: "admin", email: "admin@gmail.com"});
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
 });
passport.deserializeUser((user, done) => {
    done (null, user)
});

// if (process.env.NODE_ENV === 'development') {
//     var webpackConfig = require('../webpack.config.js')
//     var compiler = require('webpack')(webpackConfig)
//     var devMiddleware = require('webpack-dev-middleware')(compiler, {
//       publicPath: webpackConfig.output.publicPath,
//     })
//     app.use(devMiddleware)
//   } else {
//       app.use(express.static(__dirname + '../dist'));
//   }

for(routerName of fs.readdirSync(path.join(__dirname, config.routers))){
    console.log(routerName);
    let router = require(path.join(__dirname, config.routers, routerName))
    app.use(router);
}

app.use('/assets', express.static(path.join(__dirname, '../dist/assets')));

// define the home page route
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(config.port);
