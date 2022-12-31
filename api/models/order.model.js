const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");


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
		orderComplete: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		deliveryType: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: true,
	}
);

module.exports = Order;
