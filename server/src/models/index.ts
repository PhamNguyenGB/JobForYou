import { Sequelize } from "sequelize";
import dotenv from "dotenv";
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

const UserModel = userModel(sequelize);
const AdminModel = adminModel(sequelize);
const ApplicationModel = applicationModel(sequelize);
const CompanyModel = companyModel(sequelize);
const DistrictModel = districtModel(sequelize);
const JobCategoryModel = jobCategoryModel(sequelize);
const JobPostDistrictModel = jobPostDistrictModel(sequelize);
const JobPostModel = jobPostModel(sequelize);
const JobPostLevelModel = jobPostLevelModel(sequelize);
const LevelModel = levelModel(sequelize);
const SavedJobModel = savedJobModel(sequelize);
const ProfileModel = profileModel(sequelize);
const ProvinceModel = provinceModel(sequelize);
const TokenModel = tokenModel(sequelize);

const models = {
  UserModel,
  AdminModel,
  ApplicationModel,
  CompanyModel,
  DistrictModel,
  JobCategoryModel,
  JobPostDistrictModel,
  JobPostModel,
  JobPostLevelModel,
  LevelModel,
  SavedJobModel,
  ProfileModel,
  ProvinceModel,
  TokenModel,
};

Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
