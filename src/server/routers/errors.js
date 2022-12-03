"use strict";
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const logger  = require("../utils/logger.js");



router.use(function(err, req, res, next) {
    if (!err) {
        return next();
    }

    logger.error(err.stack);
    res.status(err.status || 500);

    // Respond with json
    if (req.accepts("json")) {
        return res.json({err: err.message});
    }
});

router.use(function(req, res) {
    res.status(404);

    // Respond with json
    if (req.accepts("json")) {
        return res.json({});
    }
});

module.exports = router;
