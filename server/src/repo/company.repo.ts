import models from "../models";
import { CompanyDto } from "../types/company.types";

export class CompanyRepo {
  async createCompany(companyData: CompanyDto) {
    const company = await models.CompanyModel.create(companyData);
    return company;
  }

  async findCompanyById(id: number) {
    const company = await models.CompanyModel.findByPk(id);
    return company;
  }

  async findAllCompanies() {
    const companies = await models.CompanyModel.findAll();
    return companies;
  }

  async updateCompany(id: number, companyData: CompanyDto) {
    const company = await models.CompanyModel.findByPk(id);
    if (!company) {
      throw new Error("Company not found");
    }
    await company.update({
      name: companyData.name ? companyData.name : company.name,
      description: companyData.description
        ? companyData.description
        : company.description,
      address: companyData.address ? companyData.address : company.address,
      avatar: companyData.avatar ? companyData.avatar : company.avatar,
      link_website: companyData.link_website
        ? companyData.link_website
        : company.link_website,
      members: companyData.members ? companyData.members : company.members,
    });
    return company;
  }

  async deleteCompany(id: number) {
    const company = await models.CompanyModel.findByPk(id);
    if (!company) {
      throw new Error("Company not found");
    }
    await company.destroy();
    return "Company deleted successfully";
  }
}

const companyRepo = new CompanyRepo();
export default companyRepo;
