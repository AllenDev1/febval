const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

//SalesBanner model
const SalesBanner = sequelize.define(
    "SalesBanner",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = SalesBanner;