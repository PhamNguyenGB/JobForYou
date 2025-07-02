import jobPostLevelController from "../controllers/jobPostLevel.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const JobPostLevelRoute = (app: Express) => {
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("employer"),
    jobPostLevelController.createJobPostLevel
  );
  router.delete(
    "/delete/:id",
    authenticateToken,
    authorizeRoles("employer"),
    jobPostLevelController.deleteJobPostLevel
  );

  return app.use("/api/job-post-levels", router);
};

export default JobPostLevelRoute;
