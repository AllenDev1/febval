const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const SalesCarousel = sequelize.define(
	"SalesCarousel",
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
