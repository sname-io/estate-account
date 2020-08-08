const { User } = require("../db/models");

if (process.env.ADMINS) {
  const ADMINS = process.env.ADMINS.split("-");

  ADMINS.forEach(async (a, index) => {
    const [admin, password] = a.split(":");
    const user = await User.findOne({ where: { username: admin } });
    if (user) {
      console.log(user);
    } else {
      // await User.create({ username: admin, password: password });
      console.log("no usr");
    }
  });
}
