const products = require('../../../components/product');
const { createUser } = require('../../../components/user');
const data_client = require("../../../data/data_client");
let user;
let rental;
beforeAll(async () => {
  user = await createUser("test", "test@gmail.com", "test", "12345678");
});

afterAll(async () => {
  let result = await data_client.deleteRental(rental);
  result = await data_client.deleteUser(user);
});

test('create a product', async () => {
  let product = {name: "product",
            price: 1,
            user: user.email,
            phone: "12345678",
            location: "Tel Aviv",
            category: "other",
            quantity: 1}
  rental = await products.createRental(product);

  expect(rental.id).toBeDefined();
  expect(rental.name).toBe(product.name);

  let comment = await products.createComment(rental.id, "comment", user.id);
  expect(comment.id).toBeDefined();
  expect(comment.text).toBe("comment");

  let rating = await products.createRating(rental.id, 3, user.id);
  expect(rating.id).toBeDefined();
  expect(rating.value).toBe(3);
  
  let result = await data_client.deleteComment(comment);
  expect(result.value).toBeTruthy();
  result = await data_client.deleteRating(rating);
  expect(result.value).toBeTruthy();

});