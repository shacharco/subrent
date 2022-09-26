
class Product{
    name
    price
    user
    category
    quantity
    constructor(name, price, user, category, quantity){
        this.name = name;
        this.price = price;
        this.user = user;
        this.category = category;
        this.quantity = quantity;
    }
    toJson(){
        return {
            name: this.name,
            price: this.price,
            user: this.user,
            category: this.category,
            quantity: this.quantity
        }
    }

}