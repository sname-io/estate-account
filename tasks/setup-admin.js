const { User } = require("../db/models");

const ADMINS = process.env.ADMINS.split("-");

ADMINS.forEach((a, index) => {
  console.log(a);
  console.log(index)[(admin, password)] = a.split(":");
  console.log("admin ", admin);
  console.log("password ", password);
});
