import * as savedJobService from "../services/savedJob.services";
import { Request, Response } from "express";

export const getSavedJob = async (req: Request, res: Response) => {
  const user_id = Number(res.locals.user.id);
  const savedJob = await savedJobService.getSavedJob(user_id);
  res.status(200).json(savedJob);
  return;
};

export const createSavedJob = async (req: Request, res: Response) => {
  const user_id = Number(res.locals.user.id);
  const job_post_id = Number(req.body.job_post_id);
  const savedJob = await savedJobService.createSavedJob(user_id, job_post_id);
  res.status(200).json(savedJob);
  return;
};

export const deleteSavedJob = async (req: Request, res: Response) => {
  const user_id = Number(res.locals.user.id);
  const job_post_id = Number(req.body.job_post_id);
  const savedJob = await savedJobService.deleteSavedJob(user_id, job_post_id);
  res.status(200).json(savedJob);
  return;
};
