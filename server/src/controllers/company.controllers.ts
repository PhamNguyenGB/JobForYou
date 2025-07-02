import companyServices from "../services/company.services";
import { Request, Response } from "express";

export class CompanyController {
  getAllCompanies = async (req: Request, res: Response) => {
    const companies = await companyServices.getAllCompanies();
    res.status(200).json(companies);
    return;
  };

  getCompanyById = async (req: Request, res: Response) => {
    const company = await companyServices.getCompanyById(Number(req.params.id));
    res.status(200).json(company);
    return;
  };

  createCompany = async (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      admin_id: Number(req.body.admin_id),
    };
    const company = await companyServices.createCompany(payload);
    res.status(200).json(company);
    return;
  };

  updateCompany = async (req: Request, res: Response) => {
    const company = await companyServices.updateCompany(
      Number(req.body.companyId),
      req.body
    );
    res.status(200).json(company);
    return;
  };

  deleteCompany = async (req: Request, res: Response) => {
    const company = await companyServices.deleteCompany(Number(req.params.id));
    res.status(200).json(company);
    return;
  };
}

const companyController = new CompanyController();
export default companyController;
