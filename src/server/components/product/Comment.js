const sanitizer = require("../../utils/sanitize.js");

class Comment{
    product
    user
    text
    constructor(product, user, text){
        this.product = sanitizer.escapeJSON(product);
        this.user = sanitizer.escapeJSON(user);
        this.text = sanitizer.escapeJSON(text.slice(0,100));
    }

    toJson(){
        return {
            product: this.product,
            user: this.user,
            text: this.text
        }
    }
    
    toString(){
        return JSON.stringify(this.toJson());
    }
}

module.exports = { 
    Comment
}