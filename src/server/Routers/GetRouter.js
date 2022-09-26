const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const product = require("../components/product");

router.use(bodyParser.json());

router.get("/find/", async function(req, res){
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

router.get("/rentals/", async function(req, res){
  let rentals = await product.getRentals(req.query.search);
  res.send(rentals?rentals:[]);
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

module.exports = router;