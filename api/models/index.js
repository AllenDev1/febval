const User = require("./user.model");
const Product = require("./product.model");
const Order = require("./order.model");
const ProductImages = require("./productImages.model");
const sequelize = require("../database/sequelize");
const Cart = require("./cart.model");
const SalesBanner = require("./salesBanner.model");
const SalesCarousel = require("./salesCarousel.model");
const { Sequelize, DataTypes } = require("sequelize");

const ProductOrder = sequelize.define(
	"ProductOrder",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

const ProductCart = sequelize.define(
	"ProductCart",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);




Product.ProductImages = Product.hasMany(ProductImages, {
	foreignKey: "productId",
	sourceKey: "id",
	as: "productImages",
});

User.Order = User.hasMany(Order, {
	foreignKey: "userId",
	sourceKey: "id",
});

Product.Order = Product.belongsToMany(Order, {
	through: ProductOrder,
	foreignKey: "productId",
	otherKey: "orderId",
});

Order.Product = Order.belongsToMany(Product, {
	through: ProductOrder,
	foreignKey: "orderId",
	otherKey: "productId",
});


Cart.Product = Cart.belongsToMany(Product, {
    through: ProductCart,
    foreignKey: "cartId",
    sourceKey: "id",
    as: "product",
});

Product.Cart = Product.belongsToMany(Cart, {
    through: ProductCart,
    foreignKey: "productId",
    sourceKey: "id",
    as: "cart",
});



module.exports = {
	User,
	Product,
	Order,
	ProductImages,
	ProductOrder,
	Cart,
	SalesBanner,
	SalesCarousel,
	sequelize,
};
