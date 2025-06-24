import express, { Express } from "express";
import * as adminController from "../controllers/admin.controllers";

const router = express.Router();

const AdminRoute = (app: Express) => {
  router.post("/register", adminController.register);
  router.post("/login", adminController.login);
  router.post("/logout", adminController.logout);

  return app.use("/api/admin", router);
};

export default AdminRoute;
