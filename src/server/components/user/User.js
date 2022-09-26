
class User{
    name
    email
    phone
    constructor(name, email, phone){
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    toJson(){
        return {
            name: this.name,
            email: this.email,
            phone: this.phone
        }
    }
}

module.exports = { 
    User
}