const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

// define search model
const Search = sequelize.define(
	"Search",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		keyword: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Search;
