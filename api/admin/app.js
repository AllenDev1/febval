const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const express = require("express");
const session = require("express-session");
const sqlite = require("better-sqlite3");
const {
    sequelize,
    User,
    Product,
    Order,
    ProductImages,
    ProductOrder,

    SalesBanner,
    SalesCarousel,
} = require("../models/index");
const AdminJSSequelize = require("@adminjs/sequelize");

const PORT = 5000;

const DEFAULT_ADMIN = {
    email: "example@example.com", // LOAD FROM PROCESS.env
    password: "example_password", // LOAD FROM PROCESS.env
};

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

const start = async () => {
    const app = express();

    const admin = new AdminJS({
        resources: [
            User,
            Product,
            Order,
            ProductImages,
            ProductOrder,
            SalesBanner,
            SalesCarousel,
        ],
    });

    const SqliteStore = require("better-sqlite3-session-store")(session);
    const db = new sqlite("sessions.db", { verbose: console.log });

    const sessionStore = new SqliteStore({
        client: db,
        expired: {
            clear: true,
            intervalMs: 900000,
        },
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: "adminjs",
            cookiePassword: "sessionsecret",
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: "sessionsecret",
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            },
            name: "adminjs",
        }
    );
    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(
            `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
        );
    });
};

start();
