const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const ProductImages = sequelize.define(
    "ProductImages",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ProductImages;
