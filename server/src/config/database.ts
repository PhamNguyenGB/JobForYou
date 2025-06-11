import { Sequelize } from "sequelize";
import dbConfig from "./db.config";

const sequelize = new Sequelize(
  dbConfig.DB!,
  dbConfig.USER!,
  dbConfig.PASSWORD!,
  {
    host: dbConfig.HOST,
    dialect: "mysql",
  }
);

export default sequelize;
