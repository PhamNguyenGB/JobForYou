import jobPostControllers from "../controllers/jobPost.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";
import { validate } from "../middlewares/validateSchema.middleware";
import { createJobPostSchema } from "../validations/jobPost.schema";

const router = express.Router();

const JobPostRoute = (app: Express) => {
  router.get("/all/:page/:limit", jobPostControllers.getJobPosts);
  router.get("/:id", jobPostControllers.getJobPostById);
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("employer"),
    validate(createJobPostSchema),
    jobPostControllers.createJobPost
  );
  router.put("/update/:id", jobPostControllers.updateJobPost);
  router.delete("/delete/:id", jobPostControllers.deleteJobPost);

  return app.use("/api/job-posts", router);
};

export default JobPostRoute;
