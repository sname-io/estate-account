const { Bill, Payment } = require("../../db/models");

try {
  await Payment.destroy({
    where: {},
    truncate: true,
  });

  await Bill.destroy({
    where: {},
    truncate: true,
  });
} catch (e) {
  console.log(e);
}
