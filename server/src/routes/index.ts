import { Express } from "express";
import AuthRoute from "./auth.routes";
import AdminRoute from "./admin.routes";
import UserRoute from "./user.routes";
import ProfileRoute from "./profile.routes";
import CompanyRoute from "./company.routes";
import JobCategoryRoute from "./jobCategory.routes";
import LevelRoute from "./level.routes";
import JobPostRoute from "./jobPost.routes";
import JobPostLevelRoute from "./jobPostLevel.routes";
const routes = (app: Express) => {
  AuthRoute(app);
  AdminRoute(app);
  UserRoute(app);
  ProfileRoute(app);
  CompanyRoute(app);
  JobCategoryRoute(app);
  LevelRoute(app);
  JobPostRoute(app);
  JobPostLevelRoute(app);
};

export default routes;
