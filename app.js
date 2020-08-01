var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
const paginate = require("express-paginate");
const session = require("express-session");
const { ensureLoggedIn } = require("connect-ensure-login");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var billsRouter = require("./routes/bills");
var apartmentsRouter = require("./routes/apartments");

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
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(paginate.middleware(10, 50));

app.use("/", indexRouter);

app.use(ensureLoggedIn("/login"));
app.use("/users", usersRouter);
app.use("/bills", billsRouter);
app.use("/apartments", apartmentsRouter);

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
