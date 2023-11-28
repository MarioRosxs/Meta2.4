'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
  
    await queryInterface.bulkInsert("Proyectos", [
      {  nombre: "Agricola", descripcion: "Sin desc",donatarioId: 29301, createdAt: new Date(), updatedAt: new Date() },
      {  nombre: "Donar sangre", descripcion: "NODESC", donatarioId: 1466483,createdAt: new Date(), updatedAt: new Date() },
      {  nombre: "Space X", descripcion: "NODESC", donatarioId: 20333,createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return  queryInterface.bulkDelete('Proyectos', {}, {});
  }
};
