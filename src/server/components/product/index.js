const data_client = require("../../data/data_client.js");
const Product = require("./Product.js").Product;
const Comment = require("./Comment.js").Comment;
const Rating = require("./Rating.js").Rating;

async function createRating(productId, value, userID){
    let rating = new Rating(productId, userID, value);
    let result = await data_client.createRating(rating.toJson());
    return result;
}

async function createComment(productId, text, userID){
    let comment = new Comment(productId, userID, text);
    let result = await data_client.createComment(comment.toJson());
    return result;
}
async function createRental(productInput){
    // let sanitizedProductInput = sanitizer.escapeJSON(sanitize(productInput));
    let product = new Product(productInput.name, productInput.price, productInput.email, productInput.phone, productInput.location, productInput.category, productInput.quantity, productInput.image);
    let result = await data_client.createRental(product.toJson());
    return result;
}
async function deleteRental(productId, user){
    // let sanitizedProductInput = sanitizer.escapeJSON(sanitize(productInput));
    // let product = new Product(productInput.name, productInput.price, productInput.email, productInput.phone, productInput.location, productInput.category, productInput.quantity, productInput.image);
    let result = false;
    let rental = await getRentalById(productId);
    if(rental.user == user.email){
        result = await data_client.deleteRental(rental);
    }
    return result.value;
}
async function getRentals(search){
    let rentals = await data_client.listRentals({query: search});
    return rentals.list?rentals.list:[];
}
async function getRentalById(rentalID){
    let rental = await data_client.getRental({query: JSON.stringify({id: rentalID})});
    return rental;
}
async function getComments(productId){
    let comments = await data_client.listComments({query: JSON.stringify({"product": productId})});
    comments = comments.list?comments.list:[];
    for (let comment of comments) {
        delete comment["id"];
        let commentUser = await data_client.getUser({query: JSON.stringify({"id": comment.user})});
        comment.username = commentUser?.name;  
    }
    return comments;
}
async function getRating(productId){
    let ratings = await data_client.listRatings({query: JSON.stringify({"product": productId})});
    ratings = ratings.list ? ratings.list : [];
    const sum = ratings.reduce((a, b) => a + b.value, 0);
    const avg = (sum / ratings.length) || 0;
    return avg;
}

  module.exports = {createComment, createRental, deleteRental, createRating, getRentals, getRentalById, getComments, getRating};