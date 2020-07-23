const { User, sequelize } = require("../../db/models");

afterAll(async (done) => {
  sequelize.close();
  done();
});

describe("User", () => {
  test("it should have role admin as default", async (done) => {
    const user = User.build({
      username: "Username",
      password: "password",
    });
    expect(user.role).toEqual("admin");

    done();
  });
});
