const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

// Cart model
const Cart = sequelize.define(
	"Cart",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue: 1,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Cart;