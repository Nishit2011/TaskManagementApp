const app = require("../app");
const request = require("supertest");
const User = require("../models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("1. Should sign up new user!!", async () => {
  await request(app)
    .post("/user")
    .send({
      name: "Ajeet",
      email: "aj@gmail.com",
      password: "ajeet1234",
    })
    .expect(201);
});

test("2. Should login the existing user!!", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "Test User",
      email: "test@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("test1234");
  expect(user.tokens).toEqual(expect.arrayContaining(user.tokens));
});

test("3. Should not login non-existent user!!", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "",
      password: "",
    })
    .expect(400);
});

test("4. Authenticated user should get their profile", async () => {
  await request(app)
    .get("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// test("Authenticated user should be able to delete their profile", async () => {
//   const response = await request(app)
//     .delete("/user/me")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200);
//     const user = await User.findById(userOneId);

// });
test("5. UnAuthenticated user should not be able to delete their profile", async () => {
  await request(app).delete("/user/me").send().expect(401);
});

test("6. Get all tasks of user", async () => {
  await request(app)
    .get("/user/getTasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
