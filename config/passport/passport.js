const { User } = require("../../db/models");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (user && user.isValidPassword(password)) {
        console.log("error message herssse");
        return done(null, user);
      } else {
        console.log("error message here");
        return done(null, false, { message: "Incorrect username / password" });
      }
    } catch (err) {
      console.log("Error:", err);

      return done(null, false, {
        message: "Something went wrong with your Signin",
      });
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
