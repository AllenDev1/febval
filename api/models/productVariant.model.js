const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database/sequelize");

const ProductVariant = sequelize.define(
	"productVariant",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		label: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		timestamps: true,
	}
);

module.exports = ProductVariant;
