var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
const paginate = require("express-paginate");
var cookieSession = require("cookie-session");
const authenticationMiddleware = require("./middlewares/authentication-middleware");
const flash = require("express-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var billsRouter = require("./routes/bills");
var apartmentsRouter = require("./routes/apartments");
var paymentsRouter = require("./routes/payments");

require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],

    // Cookie Options
    maxAge: 72 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(paginate.middleware(10, 50));
app.use(authenticationMiddleware());
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bills", billsRouter);
app.use("/apartments", apartmentsRouter);
app.use("/payments", paymentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (err.status === 404) {
    res.locals.message = "Oops. This page does not exist";
  } else {
    res.locals.message = "Oops. Something went wrong";
  }

  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("this s the error ", err);
  // render the error page
  res.status(err.status || 500);
  res.render("error", { status: err.status });
});

module.exports = app;
