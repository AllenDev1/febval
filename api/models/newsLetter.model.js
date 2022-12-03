const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const NewsLetter = sequelize.define(
	"NewsLetter",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = NewsLetter;
