import express, { Express } from "express";
import authController from "../controllers/auth.controllers";
import { validate } from "../middlewares/validateSchema.middleware";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../validations/user.schema";
const router = express.Router();

const AuthRoute = (app: Express) => {
  router.post("/register", validate(createUserSchema), authController.register);
  router.post("/login", validate(loginUserSchema), authController.login);
  router.post("/refresh-token", authController.refresh_token);
  router.post("/logout", authController.logout);

  return app.use("/api/auth", router);
};

export default AuthRoute;
