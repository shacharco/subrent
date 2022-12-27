
const sanitizer = require("../../utils/sanitize.js");

class User{
    name
    email
    password
    phone
    constructor(name, email, password, phone){
        this.name = sanitizer.escapeJSON(name);
        this.email = sanitizer.escapeJSON(email);
        this.password = password;
        this.phone = sanitizer.escapeJSON(phone);
    }

    toJson(){
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone
        }
    }

    toString(){
        return JSON.stringify(this.toJson());
    }
}

module.exports = { 
    User
}