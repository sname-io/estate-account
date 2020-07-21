const { User } = require("../../db/models");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (user && user.isValidPassword(password)) {
        return done(null, user);
      } else {
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

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
