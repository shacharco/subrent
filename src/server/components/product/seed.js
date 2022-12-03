"use strict";

let logger 			= require("../../utils/logger.js");
const { getUserByEmail } = require("../user/index.js");
const {createRental, createComment, createRating, getRentals} = require("./");

module.exports = function() {
	/**
	 * Create default `admin` and `test` users
	 */
    let rentals = await getRentals();
    if(rentals.length === 0){
        for (let i = 0; i < 20; i++) {
            let user = getUserByEmail("test" + i%10 + "@gmail.com");
            let product = {name: "product" + i,
                        price: i,
                        user: user.email,
                        phone: "12345678",
                        location: "Tel Aviv",
                        category: "other",
                        quantity: 1}
            let rentali = await createRental(product);
            await createComment(rentali.id, "comment" + i, user.id);      
            await createRating(rentali.id, i%5+1, user.id);      
        }
    }
    logger.info("Done rentals seed.");
};
