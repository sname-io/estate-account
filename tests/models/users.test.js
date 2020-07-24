const { User, sequelize } = require("../../db/models");

afterAll(async (done) => {
  sequelize.close();
  done();
});

describe("User", () => {
  test("it should have role admin as default", async (done) => {
    const user = await User.create({
      username: "username",
      password: "password",
    });
    expect(user.role).toEqual("admin");
    done();
  });
});
