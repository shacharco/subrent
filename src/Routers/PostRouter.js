const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../db/db.js");

router.use(bodyParser.json());

router.get("/post/", function(req, res){
    res.render("post", {});
});
router.post("/rent", function(req, res){
    console.log(req.body);
    let result = db.createRental(req.body);
    res.send(result);
});
module.exports = router;