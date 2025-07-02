import jobPostDistrictController from "../controllers/jobPostDistrict.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const JobPostDistrictRoute = (app: Express) => {
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("admin"),
    jobPostDistrictController.createJobPostDistrict
  );
  router.delete(
    "/delete/:id",
    authenticateToken,
    authorizeRoles("admin"),
    jobPostDistrictController.deleteJobPostDistrict
  );

  return app.use("/api/job-post-districts", router);
};

export default JobPostDistrictRoute;
