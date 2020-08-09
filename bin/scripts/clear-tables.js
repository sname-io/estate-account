const { Bill, Payment } = require("../../db/models");

try {
  Payment.destroy({
    where: {},
    truncate: true,
  });

  Bill.destroy({
    where: {},
    truncate: true,
  });
} catch (e) {
  console.log(e);
}
