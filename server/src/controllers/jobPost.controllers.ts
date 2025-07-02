import jobPostServices from "../services/jobPost.services";
import { Request, Response } from "express";

export class JobPostController {
  createJobPost = async (req: Request, res: Response) => {
    try {
      const payload = {
        ...req.body,
        deadline: new Date(req.body.deadline),
        user_id: res.locals.user.id,
      };

      const jobPost = await jobPostServices.createJobPost(payload);
      res.status(200).json(jobPost);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
      return;
    }
  };

  getJobPosts = async (req: Request, res: Response) => {
    try {
      console.log("chẹch", req.params);

      const page = req.params.page ? Number(req.params.page) : 1;
      const limit = req.params.limit ? Number(req.params.limit) : 10;
      const jobPosts = await jobPostServices.getJobPost(page, limit);
      res.status(200).json(jobPosts);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
      return;
    }
  };

  getJobPostById = async (req: Request, res: Response) => {
    try {
      const jobPost = await jobPostServices.getJobPostById(
        Number(req.params.id)
      );
      res.status(200).json(jobPost);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
      return;
    }
  };

  updateJobPost = async (req: Request, res: Response) => {
    try {
      const jobPost = await jobPostServices.updateJobPost(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(jobPost);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
      return;
    }
  };

  deleteJobPost = async (req: Request, res: Response) => {
    try {
      const jobPostId = Number(req.params.id);
      const userId = Number(res.locals.user.id);
      const jobPost = await jobPostServices.deleteJobPost(jobPostId, userId);
      res.status(200).json(jobPost);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
      return;
    }
  };
}

const jobPostController = new JobPostController();
export default jobPostController;
