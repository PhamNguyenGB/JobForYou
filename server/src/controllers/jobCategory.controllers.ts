import * as jobCategoryServices from "../services/jobCategory.services";
import { Request, Response } from "express";

export const getAllJobCategories = async (req: Request, res: Response) => {
  const jobCategories = await jobCategoryServices.getAllJobCategories();
  res.json(jobCategories);
  return;
};

export const getJobCategoryById = async (req: Request, res: Response) => {
  const jobCategory = await jobCategoryServices.getJobCategoryById(
    Number(req.params.id)
  );
  res.json(jobCategory);
  return;
};

export const createJobCategory = async (req: Request, res: Response) => {
  const jobCategory = await jobCategoryServices.createJobCategory(
    req.body.name,
    req.body.description
  );
  res.json(jobCategory);
  return;
};

export const deleteJobCategory = async (req: Request, res: Response) => {
  const jobCategory = await jobCategoryServices.deleteJobCategory(
    Number(req.params.id)
  );
  res.json(jobCategory);
  return;
};
