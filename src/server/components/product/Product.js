const sanitizer = require("../../utils/sanitize.js");

class Product{
    name
    price
    user
    phone
    location
    category
    quantity
    image
    constructor(name, price, user, phone, location, category, quantity, image){
        this.name = sanitizer.escapeJSON(name);
        this.price = sanitizer.escapeJSON(price);
        this.user = sanitizer.escapeJSON(user);
        this.category = sanitizer.escapeJSON(category);
        this.quantity = sanitizer.escapeJSON(quantity);
        this.phone = sanitizer.escapeJSON(phone);
        this.location = sanitizer.escapeJSON(location);
        this.image = image;
    }

    toJson(){
        return {
            name: this.name,
            price: this.price,
            user: this.user,
            phone: this.phone,
            location: this.location,
            category: this.category,
            quantity: this.quantity,
            image: this.image.path
        }
    }

    toString(){
        return JSON.stringify(this.toJson());
    }

}

module.exports = { 
    Product
}