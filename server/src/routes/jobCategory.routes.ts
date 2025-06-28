import * as jobCategoryController from "../controllers/jobCategory.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const JobCategoryRoute = (app: Express) => {
  router.get("/all", jobCategoryController.getAllJobCategories);
  router.get("/:id", jobCategoryController.getJobCategoryById);
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("employer"),
    jobCategoryController.createJobCategory
  );
  router.delete(
    "/delete/:id",
    authenticateToken,
    authorizeRoles("employer"),
    jobCategoryController.deleteJobCategory
  );

  return app.use("/api/job-categories", router);
};

export default JobCategoryRoute;
