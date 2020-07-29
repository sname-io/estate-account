"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const six_flats = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
    ];

    const createdAt = new Date();
    const updatedAt = new Date();

    const nine_flats = [15, 16, 17, 18, 19, 20];
    const nine_apartments = [];
    nine_flats.forEach((a) => {
      [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((f) => {
        nine_apartments.push({
          block_number: a,
          flat: f,
          createdAt,
          updatedAt,
        });
      });
    });

    const six_apartments = [];
    six_flats.forEach((a) => {
      [1, 2, 3, 4, 5, 6].forEach((f) => {
        six_apartments.push({
          block_number: a,
          flat: f,
          createdAt,
          updatedAt,
        });
      });
    });

    const seed_apartments = [...nine_apartments, ...six_apartments];
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
