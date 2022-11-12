const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

//salesCarousel model
const SalesCarousel = sequelize.define(
    "SalesCarousel",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

module.exports = SalesCarousel;