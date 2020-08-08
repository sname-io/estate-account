const { User } = require("../db/models");

if (process.env.ADMINS) {
  const ADMINS = process.env.ADMINS.split("-");

  ADMINS.forEach(async (a, index) => {
    const [admin, password] = a.split(":");
    const user = await User.findOne({ where: { username: admin } });
    if (!user) {
      console.log("adding");
      const role = admin == "superadmin" ? "superAdmin" : "admin";
      await User.create({ username: admin, password: password, role: role });
    }
  });

  console.log("done");
} else {
  console.log("no admin config");
}
