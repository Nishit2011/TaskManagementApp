const app = require("../app");
const request = require("supertest");
const Task = require("../models/task");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);
test("1. Authenticated users can add  tasks", async () => {
  const task = {
    name: "Task 1",
    description: "Adding Task from test case",
  };
  await request(app)
    .post("/task")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(task)
    .expect(201);

    const taskObj = await Task.find({name: task.name})
    expect(taskObj).not.toBeNull()
});

