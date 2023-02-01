const { DataTypes } = require('sequelize');
//const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  // define the model
  sequelize.define('Seat', {
    
    id: {
      type: DataTypes.UUID,
      //autoIncrement: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      
    },
    row: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  });
};

