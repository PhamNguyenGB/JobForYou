import express, { Express } from "express";
import * as adminController from "../controllers/admin.controllers";
import {
  createAdminSchema,
  loginAdminSchema,
} from "../validations/admin.schema";
import { validate } from "../middlewares/validateSchema.middleware";

const router = express.Router();

const AdminRoute = (app: Express) => {
  router.post("/register", adminController.register);
  router.post("/login", validate(loginAdminSchema), adminController.login);
  router.post("/logout", adminController.logout);

  return app.use("/api/admin", router);
};

export default AdminRoute;
