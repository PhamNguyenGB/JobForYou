import { Express } from "express";
import AuthRoute from "./auth.routes";
import AdminRoute from "./admin.routes";
import UserRoute from "./user.routes";
import ProfileRoute from "./profile.routes";
const routes = (app: Express) => {
  AuthRoute(app);
  AdminRoute(app);
  UserRoute(app);
  ProfileRoute(app);
};

export default routes;
