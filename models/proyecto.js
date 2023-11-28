'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    static associate(models) {
      Proyecto.belongsToMany(models.Persona, {
        through: 'Donadores',
        as: 'donadores',
        foreignKey: 'ProyectoId',
        otherKey: 'PersonaId'
      });
      Proyecto.belongsTo(models.Persona,{
        as: 'Donatario',
        foreignKey: 'DonatarioId',
      })
    }
  }

  
  Proyecto.init({
    idProyecto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    donatarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Proyecto',
  });

  

  return Proyecto;
};
