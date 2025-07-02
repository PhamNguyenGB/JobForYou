import { CompanyDto } from "../types/company.types";
import companyRepo from "../repo/company.repo";

export class CompanyServices {
  createCompany = async (companyData: CompanyDto) => {
    try {
      const company = await companyRepo.createCompany(companyData);
      return company;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  };

  getCompanyById = async (companyId: number) => {
    try {
      const company = await companyRepo.findCompanyById(companyId);
      return company;
    } catch (error) {
      console.error("Error getting company:", error);
      throw error;
    }
  };

  getAllCompanies = async () => {
    try {
      const companies = await companyRepo.findAllCompanies();
      return companies;
    } catch (error) {
      console.error("Error getting all companies:", error);
      throw error;
    }
  };

  updateCompany = async (companyId: number, companyData: CompanyDto) => {
    try {
      const company = await companyRepo.updateCompany(companyId, companyData);
      return company;
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  };

  deleteCompany = async (companyId: number) => {
    try {
      await companyRepo.deleteCompany(companyId);
      return "Company deleted successfully";
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  };
}

const companyServices = new CompanyServices();
export default companyServices;
