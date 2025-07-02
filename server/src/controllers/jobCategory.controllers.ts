import jobCategoryServices from "../services/jobCategory.services";
import { Request, Response } from "express";

class JobCategoryController {
  getAllJobCategories = async (req: Request, res: Response) => {
    const jobCategories = await jobCategoryServices.getAllJobCategories();
    res.json(jobCategories);
    return;
  };

  getJobCategoryById = async (req: Request, res: Response) => {
    const jobCategory = await jobCategoryServices.getJobCategoryById(
      Number(req.params.id)
    );
    res.json(jobCategory);
    return;
  };

  createJobCategory = async (req: Request, res: Response) => {
    const jobCategory = await jobCategoryServices.createJobCategory(
      req.body.name,
      req.body.description
    );
    res.json(jobCategory);
    return;
  };

  deleteJobCategory = async (req: Request, res: Response) => {
    const jobCategory = await jobCategoryServices.deleteJobCategory(
      Number(req.params.id)
    );
    res.json(jobCategory);
    return;
  };
}

const jobCategoryController = new JobCategoryController();
export default jobCategoryController;
