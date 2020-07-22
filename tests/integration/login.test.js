var request = require("supertest");
const app = require("../../app");
const { User } = require("../../db/models");
const { sequelize } = require("../../db/models");

beforeEach(async (done) => {
  await User.create(
    {
      username: "sname",
      password: "osiname",
      role: "admin",
    },
    { fields: ["username", "password", "role"] }
  );

  done();
});

afterAll(async (done) => {
  // Closing the DB connection allows Jest to exit successfully.
  sequelize.close();
  done();
});

describe("logging in", function () {
  it("logs in the user", function (done) {
    request(app)
      .post("/login")
      .send({ username: "sname", password: "osiname" })
      .expect(302)
      .expect("Location", /\/dashboard/, done);
  });

  it("does not log in the user with bad details", function (done) {
    request(app)
      .post("/login")
      .send({ username: "bad", password: "password" })
      .expect(302)
      .expect("Location", /\/login/, done);
  });
});
