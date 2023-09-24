const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {checkAuthenticated} = require("./auth/helper.js");
const user = require("../components/user");
const logger = require("../utils/logger.js");

router.use(bodyParser.json());

router.get("/currentUser/", checkAuthenticated, async function(req, res){
  res.send(req.user);
});

router.get("/userRentals/", checkAuthenticated, async function(req, res){
  try {
    let rentals = await user.getUserRentals(req.user.email);
    rentals.forEach(rental => {
      if(rental.image){
        let image_path = rental.image.split("\\");
        rental.image = `/uploads/${image_path[image_path.length-1]}`;  
      }
    });
    res.send(rentals);
  } catch(error) {
    logger.error(error);
    res.send([]);
  }
});

router.delete("/item", async function(req, res){
  let result = await user.removeUserRental(req.body);
  res.send(result);
});

router.get("/userInfo", async function(req, res){
  try {
    let userResult = await user.getUserByEmail(req.query.email);
    if(userResult) {
      res.send(userResult);
    } else {
      res.send(undefined);
    }
  } catch(error) {
    logger.error(error);
    res.send(undefined);
  }

});

router.post("/signup", async function(req, res){
  if (!req.body.username){
    req.body.username = req.body.email;
  }
  await user.createUser();
});
router.post("/forgot", async function(req, res){
  user.reset();
});

module.exports = router;