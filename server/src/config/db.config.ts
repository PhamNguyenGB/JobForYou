// config/db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const config = {
  DB_NAME: process.env.DB_NAME || "db_name",
  DB_USER: process.env.DB_USER || "db_user",
  DB_PASSWORD: process.env.DB_PASSWORD || "db_password",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "3306"),
};

export default config;
