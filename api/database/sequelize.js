const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: process.env.DB_HOST,
			port: 3306,
			dialect: "mysql",
		}
	);
} else {
	sequelize = new Sequelize({
		dialect: "sqlite",
		storage: "database.sqlite",
	});
}

const connect = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

connect();

module.exports = sequelize;
