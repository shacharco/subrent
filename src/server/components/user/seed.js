"use strict";

let logger 			= require("../../utils/logger.js");
const {createUser, getUsers} = require("./");

module.exports = function() {
	/**
	 * Create default `admin` and `test` users
	 */
    let users = await getUsers();
    if(users.length === 0){
        let admin = await createUser("admin", "admin@gmail.com", "admin", "12345678");
        let test = await createUser("test", "test@gmail.com", "test", "12345678");
        for (let i = 0; i < 10; i++) {
            let useri = await createUser("test"+i, "test"+i+"@gmail.com", "test"+i, "12345678");            
        }
    }
    logger.info("Done users seed.");
};
