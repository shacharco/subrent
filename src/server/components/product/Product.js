
class Product{
    name
    price
    user
    phone
    location
    category
    quantity
    constructor(name, price, user, phone, location, category, quantity){
        this.name = name;
        this.price = price;
        this.user = user;
        this.category = category;
        this.quantity = quantity;
        this.phone = phone;
        this.location = location;
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

}