function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return str.startsWith("{");
}
function escapeJSON(json){
    let jsonString = JSON.stringify(json)
    if(!isJsonString(jsonString)){
        let escaped = "";
        if(typeof(json) == 'string'){
            let words = json.split(" ");
            for(let i = 0; i < words.length; i++){
                escaped += escape(words[i]);
                if(i < words.length-1){
                    escaped += " ";
                }
            }
        }else{
            escaped = escape(json);
        }
        return escaped;
    }
    escapedJSON = {};
    for(var attributename in json){
        escapedJSON[escape(attributename)] = escapeJSON(json[attributename]);
    }
    return escapedJSON;

}
module.exports = {
    escapeJSON, isJsonString
}