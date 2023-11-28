'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cambia 'Personas' y 'Proyectos' a los nombres de tus tablas en la base de datos
    const personas = await queryInterface.sequelize.query('SELECT id FROM Personas;');
    const proyectos = await queryInterface.sequelize.query('SELECT id FROM Proyectos;');

    const personaIds = personas[0].map((row) => row.id);
    const proyectoIds = proyectos[0].map((row) => row.id);

    await queryInterface.bulkInsert("Donadores", [
      { PersonaId: personaIds[0], ProyectoId: proyectoIds[0], imagen: "NoIMG", cantidadDonada: "1", createdAt: new Date(), updatedAt: new Date() },
      { PersonaId: personaIds[1], ProyectoId: proyectoIds[1], imagen: "NoIMG", cantidadDonada: "3", createdAt: new Date(), updatedAt: new Date() },
      { PersonaId: personaIds[2], ProyectoId: proyectoIds[2], imagen: "NoIMG", cantidadDonada: "2", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Donadores', {}, {});
  }
};
