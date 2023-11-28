'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(models) {
      Persona.belongsToMany(models.Proyecto, {
        through: 'Donadores',
        as: 'donadores',
        foreignKey: 'PersonaId',
        otherKey: 'ProyectoId',
      });
      Persona.hasMany(models.Proyecto,{
        as: 'Donatarios',
        foreignKey: 'DonatarioId',
      })
    }
  }
  Persona.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Persona',
  });

  return Persona;
};
