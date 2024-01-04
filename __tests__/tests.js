const request = require("supertest");
const DB = require("../src/models");
const app = require(".././src/main");

let server, agent;

const login = async (agent, username, password) => {
  let res = await agent.get("/");
  res = await agent.post("/Users/Signin").send({
    email: username,
    password: password,
  });
};

describe("Chat Wave Test Suite", () => {
  beforeAll(async () => {
    //   await DB.connection.db.dropDatabase(function () {
    //     done();
    //   });
    await DB.connection.dropDatabase();
    server = app.listen(process.env.PORT || 3008, () => {});
    agent = request.agent(server);
  });
  afterAll(async () => {
    DB.connection.close();
    server.close();
  });
  test("Signup", async () => {
    const response = await agent.post("/Users/Signup").send({
      firstName: "Javid",
      lastName: "Sumra",
      email: "test@gmail.com",
      mobileNO: "123456789",
      password: "123",
    });
    expect(response.statusCode).toBe(200);
  });
  test("Signin", async () => {
    const response = await agent.post("/Users/Signin").send({
      email: "test@gmail.com",
      password: "123",
    });
    expect(response.statusCode).toBe(200);
  });
});
