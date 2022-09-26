const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../utils/auth.js");
const product = require("../components/product");

router.use(bodyParser.json());

router.get("/post/", function(req, res){
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
router.post("/rent", async function(req, res){
    let result = await product.createRental(req.body);
    res.send(!!result);
});

router.post("/comment", auth.checkAuthenticated ,async function(req, res){
    let result = await product.createComment(req.body?.product?._id, req.body.comment, req.user?._id);
    if(!result){
        res.status(404);
    }else{
        res.send(!!result);
    }
});
router.post("/rating", auth.checkAuthenticated ,async function(req, res){
    let result = await product.createRating(req.body?.product?._id, req.body.value, req.user?._id);
    if(!result){
        res.status(404);
    }else{
        res.send(!!result);
    }
});

router.get("/card/", function(req, res){
    res.render("card", {});
});
router.get("/edit/", function(req, res){
    res.render("card", {});
});

module.exports = router;