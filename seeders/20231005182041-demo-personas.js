'use strict';

/** @type {import('sequelize-cli').Migration } */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Personas", [
      { rfc: "ROAM020618HB19", nombre: "MR", imagen: "NoIMG", createdAt: new Date(), updatedAt: new Date() },
      { rfc: "VICK030212KL3E", nombre: "VG", imagen: "NoIMG", createdAt: new Date(), updatedAt: new Date() },
      { rfc: "DLJ022402KSLLA", nombre: "DL", imagen: "NoIMG", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Personas", null, {});
  },
};
