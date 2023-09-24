"use strict";
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

let graphqlExpress 		= require("graphql-server-express").graphqlExpress;
let graphiqlExpress  	= require("graphql-server-express").graphiqlExpress;

// Register graphql server
router.use("/graphql", graphqlExpress( (req) => {
    const query = req.query.query || req.body.query;
    if (query && query.length > 2000) {
        // None of our app's queries are this long
        // Probably indicates someone trying to send an overly expensive query
        throw new Error("Query too large.");
    }	
}));

router.use("/graphiql", graphiqlExpress({
    endpointURL: "/graphql",
}));	

module.exports = router;
