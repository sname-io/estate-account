const { ensureLoggedIn } = require("connect-ensure-login");

const authenticationMiddleware = () => (req, res, next) => {
  const whiteList = ["/login"];
  if (whiteList.includes(req.path)) {
    return next();
  }

  ensureLoggedIn()(req, res, next);
};

module.exports = authenticationMiddleware;
