import * as applicationController from "../controllers/application.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const ApplicationRoute = (app: Express) => {
  router.post(
    "/apply",
    authenticateToken,
    authorizeRoles("user"),
    applicationController.createApplication
  );
  router.get(
    "/user",
    authenticateToken,
    authorizeRoles("user"),
    applicationController.getMyApplication
  );
  router.get(
    "/employer",
    authenticateToken,
    authorizeRoles("employer"),
    applicationController.getApplicationForEmployer
  );

  return app.use("/api/applications", router);
};

export default ApplicationRoute;
