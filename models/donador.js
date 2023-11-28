'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donador extends Model {
    static associate(models) {
      // Define las asociaciones según tu lógica de negocio
    }
  }
  Donador.init({
    // Define las columnas aquí
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },    
    PersonaId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    ProyectoId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidadDonada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Donadores',
  });

  

return Donador;
};

