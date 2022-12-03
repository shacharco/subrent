const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const product = require("../components/product");
const {checkAuthenticated} = require("./auth/helper.js");

router.use(bodyParser.json());

router.get("/rentals/", async function(req, res){
  let rentals = await product.getRentals(req.query.search);
  res.send(rentals);
});

router.get("/rental/", async function(req, res){
  let rental = await product.getRentalById(req.query.id);
  res.send(rental?rental:{});
});

router.get("/comments/", async function(req, res){
  let comments = await product.getComments(req.query.productId);
  res.send(comments);
});

router.get("/ratings/", async function(req, res){
  const rating = await product.getRating(req.query.productId);
  res.send({rating: rating});
});
router.post("/rent", async function(req, res){
    let result = await product.createRental(req.body);
    res.send(!!result);
});

router.post("/comment", checkAuthenticated ,async function(req, res){
    let result = await product.createComment(req.body?.product?.id, req.body.comment, req.user?.id);
    if(!result){
        res.status(404);
    }else{
        res.send(!!result);
    }
});
router.post("/rating", checkAuthenticated ,async function(req, res){
    let result = await product.createRating(req.body?.product?.id, req.body.value, req.user?.id);
    if(!result){
        res.status(404);
    }else{
        res.send(!!result);
    }
});
module.exports = router;