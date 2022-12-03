const sanitize = require('mongo-sanitize');
const sanitizer = require("../../server/utils/sanitize.js")
function serialize(element){
    if(typeof element.query === "string"){
        if(sanitizer.isJsonString(element.query)){
            element = JSON.parse(element.query);
        } else {
            element = {};
        }
    }
    if(element.id){
        element._id = element.id;
        delete element.id;
    }
    return sanitize(element);
}
function deserializeOne(element){
    let json = element.toObject();
    json.id = json._id.toString();
    delete json._id;
    return json;
}
function deserialize(element){
    if(Array.isArray(element)){
        for(let i = 0; i < element.length; i++){
            element[i] = deserializeOne(element[i]);
        }
        return element;
    } else if (element.toObject){
        return deserializeOne(element);
    } else {
        return element;
    }
    
}


module.exports = {serialize, deserialize};