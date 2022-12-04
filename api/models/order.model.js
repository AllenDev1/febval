const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Product = require("./product.model");
const User = require("./user.model");

// Order ==> Product (One to Many)
// Product ==> Order (One to Many)

// Order model
const Order = sequelize.define(
	"Order",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
	
		total: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Order;
