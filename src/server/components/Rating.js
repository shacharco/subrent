
class Rating{
    product
    user
    value
    constructor(product, user, value){
        this.product = product;
        this.user = user;
        this.value = value || 0;
    }

    toJson(){
        return {
            product: this.product,
            user: this.user,
            value: this.value
        }
    }
}

module.exports = { 
    Rating
}