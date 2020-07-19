var request = require("supertest");
const app = require("../../app");

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
