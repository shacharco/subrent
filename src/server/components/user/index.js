const data_client = require("../../data/data_client.js");
const { User } = require("./User.js");

async function getUserRentals(email){
    let rentals = await data_client.listRentals({query: JSON.stringify({email: email})});  
    return rentals.list;
}
async function removeUserRental(rental){
    let result = await data_client.deleteRental(rental);
    return result;
}
async function getUserByEmail(email){
    let user = await data_client.getUser({query: JSON.stringify({"email": email})});
    return user;
}
async function getUser(id){
    let user = await data_client.getUser({query: JSON.stringify({"_id": id})});
    return user;
}
async function getUsers(){
    let users = await data_client.listUsers({query: JSON.stringify({})});
    return users;
}
async function createUser(name, email, password, phone){
    let user = new User(name, email, password, phone);
    let result = await data_client.createUser(user.toJson());
    return result;

}
async function reset(email){
    let userData = await data_client.getUser({query: JSON.stringify({"email": email})});
    let user = new User(userData);
    user.password = "123456";
    let result = await data_client.createUser(user.toJson());
    if(result){
        return user;
    } else {
        return null;
    }

}
module.exports = {getUserByEmail, getUserRentals, removeUserRental, getUsers, getUser, createUser, reset};