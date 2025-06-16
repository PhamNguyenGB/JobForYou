"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("./db.config"));
exports.sequelize = new sequelize_1.Sequelize(db_config_1.default.DB_NAME, db_config_1.default.DB_USER, db_config_1.default.DB_PASSWORD, {
    host: db_config_1.default.DB_HOST,
    dialect: "mysql",
});
const connection = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.log("Unable to connect to the database:", error);
    }
};
exports.default = connection;
