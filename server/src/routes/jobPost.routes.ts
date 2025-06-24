import * as jobPostControllers from "../controllers/jobPost.controllers";
import express, { Express } from "express";

const router = express.Router();

const JobPostRoute = (app: Express) => {
  router.get("/job-posts", jobPostControllers.getJobPosts);
  router.get("/job-post/:id", jobPostControllers.getJobPostById);
  router.post("/create-job-post", jobPostControllers.createJobPost);
  router.put("/update-job-post/:id", jobPostControllers.updateJobPost);
  router.delete("/delete-job-post/:id", jobPostControllers.deleteJobPost);

  return app.use("/api/job-posts", router);
};
