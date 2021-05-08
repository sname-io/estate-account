const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {
    bill: {
      "read:any": ["*"],
    },
    payment: {
      "create:any": ["*"],
      "read:any": ["*"],
    },
    apartment: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    user: {},
  },
  superAdmin: {
    bill: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    payment: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    apartment: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    user: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  regular: {
    bill: { "read:any": ["*"] },
    payment: {
      "read:any": ["*"],
    },
    apartment: {
      "read:any": ["*"],
    },
  },
};

const authorization = (action, resource) => {
  // return a middleware
  return (req, res, next) => {
    const { user } = req;

    const ac = new AccessControl(grantsObject);
    const permission = ac.can(user.role)[action](resource);
    if (permission.granted) {
      next();
    } else {
      const backURL = req.header("Referer") || "/dashboard";
      req.flash("error", "Forbidden");
      req.res.redirect(backURL);
    }
    // }
  };
};

module.exports = authorization;
