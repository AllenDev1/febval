const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../database/sequelize");

const ProductSize = sequelize.define(
	"productSize",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		size: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = ProductSize;
