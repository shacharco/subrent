const users = require('../../../components/user');
const data_client = require("../../../data/data_client");

test('create a user', async () => {
    let user = await users.createUser("test", "test@gmail.com", "test", "12345678");
    expect(user.id).toBeDefined();
    result = await data_client.deleteUser(user);
    expect(result.value).toBeTruthy();
});