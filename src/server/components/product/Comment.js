
class Comment{
    product
    user
    text
    constructor(product, user, text){
        this.product = product;
        this.user = user;
        this.text = text;
    }

    toJson(){
        return {
            product: this.product,
            user: this.user,
            text: this.text
        }
    }
}

module.exports = { 
    Comment
}