import jobPostDistrictServices from "../services/jobPostDistrict.services";
import { Request, Response } from "express";

export class JobPostDistrictController {
  createJobPostDistrict = async (req: Request, res: Response) => {
    const jobPostId = Number(req.body.job_post_id);
    const levelId = req.body.level_id;
    const jobPostLevel = await jobPostDistrictServices.createJobPostDistrict(
      jobPostId,
      levelId
    );
    res.status(201).json(jobPostLevel);
    return;
  };

  deleteJobPostDistrict = async (req: Request, res: Response) => {
    const jobPostId = Number(req.body.job_post_id);
    const levelId = req.body.level_id;
    const jobPostLevel = await jobPostDistrictServices.deleteJobPostDistrict(
      jobPostId,
      levelId
    );
    res.status(200).json(jobPostLevel);
    return;
  };
}

const jobPostDistrictController = new JobPostDistrictController();
export default jobPostDistrictController;
