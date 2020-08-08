const { User } = require("../db/models");

if (process.env.ADMINS) {
  const ADMINS = process.env.ADMINS.split("-");

  ADMINS.forEach(async (a, index) => {
    const [admin, password] = a.split(":");
    // await User.create({ username: admin, password: password });
    console.log(a);
    console.log(index);

    console.log("admin ", admin);
    console.log("password ", password);
  });
}
