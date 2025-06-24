import * as jobPostServices from "../services/jobPost.services";
import { Request, Response } from "express";

export const createJobPost = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
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

export const getJobPosts = async (req: Request, res: Response) => {
  try {
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

export const getJobPostById = async (req: Request, res: Response) => {
  try {
    const jobPost = await jobPostServices.getJobPostById(Number(req.params.id));
    res.status(200).json(jobPost);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
    return;
  }
};

export const updateJobPost = async (req: Request, res: Response) => {
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

export const deleteJobPost = async (req: Request, res: Response) => {
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
