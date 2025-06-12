import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "/../config/config.json"))[env];

const db: any = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Read all model files and initialize them
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js") &&
      file.indexOf(".test.") === -1
    );
  })
  .forEach((file: string) => {
    const modelPath = path.join(__dirname, file);
    const modelModule = require(modelPath);

    // Handle both default export and named export
    const modelInitializer = modelModule.default || modelModule;
    const model = modelInitializer(sequelize, DataTypes);

    db[model.name] = model;
  });

// Set up associations
Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
