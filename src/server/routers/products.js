const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: "./uploads"});
const bodyParser = require("body-parser");
const product = require("../components/product");
const {checkAuthenticated} = require("./auth/helper.js");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get("/rentals/", async function(req, res){
  let rentals = await product.getRentals(req.query.search);
  rentals.forEach(rental => {
    if(rental.image){
      let image_path = rental.image.split("\\");
      rental.image = `/uploads/${image_path[image_path.length-1]}`;  
    }
  });
  res.send(rentals);
});

router.get("/rental/", async function(req, res){
  let rental = await product.getRentalById(req.query.id);
  if(rental.image){
    let image_path = rental.image.split("\\");
    rental.image = `uploads/${image_path[image_path.length-1]}`;
  }  
  res.send(rental?rental:{});
});
router.delete("/rental/", checkAuthenticated, async function(req, res){
  let result = await product.deleteRental(req.query.productId, req.user);
  res.send(!!result);
});

router.get("/comments/", async function(req, res){
  let comments = await product.getComments(req.query.productId);
  res.send(comments);
});

router.get("/ratings/", async function(req, res){
  const rating = await product.getRating(req.query.productId);
  res.send({rating: rating});
});
router.post("/rent", checkAuthenticated, upload.single('image'), async function(req, res){
    let result = await product.createRental({...req.body, image: req.file, email: req.user.email});
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