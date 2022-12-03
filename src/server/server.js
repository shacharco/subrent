var yaml_config = require('js-yaml');
var fs = require('fs');
const path = require('path');
var config = yaml_config.load(fs.readFileSync(path.join(__dirname, 'config.yml')));
const express = require('express');
const cookieParser	= require("cookie-parser");
const expressSession = require("express-session");
const app = express();

app.use(cookieParser());
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // session expiration is set by default to one week
        maxAge: 7 * 24 * (60 * 60 * 1000),

        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,

        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false
    }
}));

app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

// define the home page route
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// define the home page route
app.get("/find", function(req, res){
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// define the home page route
app.get("/post", function(req, res){
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// define the home page route
app.get("/user", function(req, res){
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// define the home page route
app.get("/register", function(req, res){
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const {init} = require("./routers/auth/helper.js");
init(app);
app.use("/auth", require("./routers/auth.js"));
app.use("/api/", require("./routers/products.js"));
app.use("/api/", require("./routers/users.js"));
app.use("/health/", require("./routers/health.js"));
app.use(require("./routers/errors.js"));

app.listen(config.port);
