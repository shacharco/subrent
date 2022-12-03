const sanitizer = require("../../utils/sanitize.js");

class Product{
    name
    price
    user
    phone
    location
    category
    quantity
    constructor(name, price, user, phone, location, category, quantity){
        this.name = sanitizer.escapeJSON(name);
        this.price = sanitizer.escapeJSON(price);
        this.user = sanitizer.escapeJSON(user);
        this.category = sanitizer.escapeJSON(category);
        this.quantity = sanitizer.escapeJSON(quantity);
        this.phone = sanitizer.escapeJSON(phone);
        this.location = sanitizer.escapeJSON(location);
    }

    toJson(){
        return {
            name: this.name,
            price: this.price,
            user: this.user,
            phone: this.phone,
            location: this.location,
            category: this.category,
            quantity: this.quantity
        }
    }

    toString(){
        return JSON.stringify(this.toJson());
    }

}

module.exports = { 
    Product
}