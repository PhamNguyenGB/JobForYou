import * as jobPostLevelServices from "../services/jobPostLevel.services";
import { Request, Response } from "express";

export const createJobPostLevel = async (req: Request, res: Response) => {
  const jobPostId = Number(req.body.job_post_id);
  const levelId = req.body.level_id;
  const jobPostLevel = await jobPostLevelServices.createJobPostLevel(
    jobPostId,
    levelId
  );
  res.status(201).json(jobPostLevel);
  return;
};

export const deleteJobPostLevel = async (req: Request, res: Response) => {
  const jobPostId = Number(req.body.job_post_id);
  const levelId = req.body.level_id;
  const jobPostLevel = await jobPostLevelServices.deleteJobPostLevel(
    jobPostId,
    levelId
  );
  res.status(200).json(jobPostLevel);
  return;
};
