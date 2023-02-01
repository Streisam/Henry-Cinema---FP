const { DataTypes } = require("sequelize");
//const { v4: uuidv4 } = require('uuid');

module.exports=(sequelize) =>{

    sequelize.define('Food',{
        id:{
            type: DataTypes.UUID,
            //autoIncrement: true,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        image: {
            type:DataTypes.TEXT,
            allowNull:false
        }
    })
}