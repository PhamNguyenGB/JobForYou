import * as JobPostDistrictServices from "../services/jobPostLevel.services";
import { Request, Response } from "express";

export const createJobPostDistrict = async (req: Request, res: Response) => {
  const jobPostId = Number(req.body.job_post_id);
  const levelId = req.body.level_id;
  const jobPostLevel = await JobPostDistrictServices.createJobPostLevel(
    jobPostId,
    levelId
  );
  res.status(201).json(jobPostLevel);
  return;
};

export const deleteJobPostDistrict = async (req: Request, res: Response) => {
  const jobPostId = Number(req.body.job_post_id);
  const levelId = req.body.level_id;
  const jobPostLevel = await JobPostDistrictServices.deleteJobPostLevel(
    jobPostId,
    levelId
  );
  res.status(200).json(jobPostLevel);
  return;
};
