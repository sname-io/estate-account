"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seed_apartments = [];
    const blocks = Array.from(new Array(27), (x, i) => i + 1);
    const nine_flat_blocks = [15, 16, 17, 18, 19, 20];
    const flats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    blocks.forEach((b) => {
      flats.forEach((f) => {
        if (f > 6 && !nine_flat_blocks.includes(b)) {
          return;
        }
        seed_apartments.push({
          block_number: b,
          flat: f,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    const apartments = await queryInterface.bulkInsert(
      "Apartments",
      seed_apartments,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Apartments", null, {});
  },
};
