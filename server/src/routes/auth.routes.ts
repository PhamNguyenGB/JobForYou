import express, { Express } from "express";
import * as authController from "../controllers/auth.controllers";

const router = express.Router();

const AuthRoute = (app: Express) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/refresh-token", authController.refresh_token);
  router.post("/logout", authController.logout);

  return app.use("/api/auth", router);
};

export default AuthRoute;
