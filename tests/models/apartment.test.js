const { Apartment } = require("../../db/models");
const { sequelize } = require("../../db/models");

afterAll(async (done) => {
  // Closing the DB connection allows Jest to exit successfully.
  sequelize.close();
  done();
});

describe("address", () => {
  it("returns apartment address", async (done) => {
    const apartment = await Apartment.build({
      block_number: "180",
      flat: "6",
    });

    expect(apartment.address()).toEqual("Block 180 flat 6");
    done();
  });
});
