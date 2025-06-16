import { Express } from "express";
import AuthRoute from "./auth.routes";
const routes = (app: Express) => {
  AuthRoute(app);
};

export default routes;
