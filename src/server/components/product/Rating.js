
const sanitizer = require("../../utils/sanitize.js");

class Rating{
    product
    user
    value
    constructor(product, user, value){
        this.product = sanitizer.escapeJSON(product);
        this.user = sanitizer.escapeJSON(user);
        this.value = value <= 5 && value > 0 ? value : 0;
    }

    toJson(){
        return {
            product: this.product,
            user: this.user,
            value: this.value
        }
    }

    toString(){
        return JSON.stringify(this.toJson());
    }
}

module.exports = { 
    Rating
}