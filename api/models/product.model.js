const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Order = require("./order.model");

//define product model
const Product = sequelize.define(
	"Product",
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
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		featured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: true,
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

module.exports = Product;
