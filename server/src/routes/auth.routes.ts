import express, { Express } from "express";
import * as userController from "../controllers/auth.controllers";

const router = express.Router();

const AuthRoute = (app: Express) => {
  router.post("/register", userController.register);
  router.post("/login", userController.login);

  return app.use("/api/auth", router);
};

export default AuthRoute;
