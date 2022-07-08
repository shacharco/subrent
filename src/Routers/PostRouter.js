const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../db/db.js");
const sanitize = require('mongo-sanitize');
const sanitizer = require("../utils/sanitize.js")
router.use(bodyParser.json());

router.get("/post/", function(req, res){
    res.render("post", {});
});
router.post("/rent", async function(req, res){
    console.log("new rent");
    console.log(req.body);
    console.log(sanitize(req.body));
    console.log(escape(sanitize(req.body)));
    console.log(sanitizer.escapeJSON(sanitize(req.body)));
    let result = await db.createRental(sanitizer.escapeJSON(sanitize(req.body)));
    res.send(result);
});

router.get("/card/", function(req, res){
    res.render("card", {});
});
router.post("/edit/", function(req, res){
    res.render("card", {});
});

module.exports = router;