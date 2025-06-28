import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

import userModel from "./user.model";
import adminModel from "./admin.model";
import applicationModel from "./application.model";
import companyModel from "./company.model";
import districtModel from "./district.model";
import jobCategoryModel from "./jobCategory.model";
import jobPostDistrictModel from "./jobPostDistrict.model";
import jobPostModel from "./jobPost.model";
import jobPostLevelModel from "./jobPostLevel.model";
import levelModel from "./level.model";
import savedJobModel from "./savedJob.model";
import profileModel from "./profile.model";
import provinceModel from "./province.model";
import tokenModel from "./token.model";

const config = require("../config/config.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const User = userModel(sequelize);
const Admin = adminModel(sequelize);
const Application = applicationModel(sequelize);
const Company = companyModel(sequelize);
const District = districtModel(sequelize);
const JobCategory = jobCategoryModel(sequelize);
const JobPostDistrict = jobPostDistrictModel(sequelize);
const JobPost = jobPostModel(sequelize);
const JobPostLevel = jobPostLevelModel(sequelize);
const Level = levelModel(sequelize);
const SavedJob = savedJobModel(sequelize);
const Profile = profileModel(sequelize);
const Province = provinceModel(sequelize);
const Token = tokenModel(sequelize);

const models = {
  User,
  Admin,
  Application,
  Company,
  District,
  JobCategory,
  JobPostDistrict,
  JobPost,
  JobPostLevel,
  Level,
  SavedJob,
  Profile,
  Province,
  Token,
};

Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
