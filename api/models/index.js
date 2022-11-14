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

Product.hasMany(ProductImages, {
    foreignKey: "productId",
    sourceKey: "id",
});

User.hasMany(Order, {
    foreignKey: "userId",
    sourceKey: "id",
});

Product.belongsToMany(Order, {
    through: ProductOrder,
    foreignKey: "productId",
    otherKey: "orderId",
});

Order.belongsToMany(Product, {
    through: ProductOrder,
    foreignKey: "orderId",
    otherKey: "productId",
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
};

module.exports = sequelize;
