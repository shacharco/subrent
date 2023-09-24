const mongoose = require('mongoose');
var yaml_config = require('js-yaml');
var fs = require('fs');
const path = require('path');
const config = yaml_config.load(fs.readFileSync(path.join(__dirname, 'config.yml')));
const logger = require("../../server/utils/logger.js");

mongoose.connect(config.db_connection_string, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if(err){
        
        logger.error(err)
    }else{
        logger.info("connected")
    }
});
const connection = mongoose.connection;

connection.once("open", function() {
  logger.info("MongoDB database connection established successfully");
});

async function create(element, schema){
    try {
        const res = await schema.create(element);
        return res;
    } catch(error) {
        console.error(error)
        return undefined;
    }
}
async function remove(element, schema){
    let res = true;
    try {
        res = await schema.deleteOne(element);
    } catch(error) {
        console.error(error)
        return false;
    }
    return res.deletedCount;
}
async function listByFieldRegex(field, value, schema){
    const query = `{ "${field}": { "$regex": "${value}", "$options": "i" }}`;
    return await list(JSON.parse(query), schema);
}

async function listByField(field, value, schema){
    const query = `{ "${field}": "" }`;
    let queryJSON = JSON.parse(query);
    queryJSON[field] = value;
    return await list(queryJSON, schema);
}

async function list(query, schema){
    const elements = await schema.find(query).lean();
    return elements;
}

async function getOneByField(field, value, schema){
    const query = `{ "${field}": "" }`;
    let queryJSON = JSON.parse(query);
    queryJSON[field] = value;
    return await getOne(queryJSON, schema);
}
async function getOne(query, schema){
    const elements = await list(query, schema);
    if(elements?.length > 0){
        return elements[0];
    }
    return {};
}
async function validateExists(field, id, schema){
    let results = await listByField(field, id, schema);
    return results?.length > 0;
}

module.exports = {
    create, list, listByField, listByFieldRegex, remove, getOne, getOneByField, validateExists
}