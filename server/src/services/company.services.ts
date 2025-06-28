import models from "../models";

interface CompanyAttributes {
  name: string;
  description?: string;
  address?: string;
  avatar?: string;
  link_website?: string;
  members?: string;
  admin_id?: number;
}

export const createCompany = async (companyData: CompanyAttributes) => {
  try {
    console.log("check company data", companyData);

    const company = await models.Company.create(companyData);
    return company;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const getCompanyById = async (companyId: number) => {
  try {
    const company = await models.Company.findByPk(companyId);
    return company;
  } catch (error) {
    console.error("Error getting company:", error);
    throw error;
  }
};

export const getAllCompanies = async () => {
  try {
    const companies = await models.Company.findAll();
    return companies;
  } catch (error) {
    console.error("Error getting all companies:", error);
    throw error;
  }
};

export const updateCompany = async (
  companyId: number,
  companyData: CompanyAttributes
) => {
  try {
    console.log("check company data", companyData, companyId);

    const company = await models.Company.findOne({ where: { id: companyId } });
    console.log("check company", company);

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
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const deleteCompany = async (companyId: number) => {
  try {
    const company = await models.Company.findByPk(companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    await company.destroy();
    return "Company deleted successfully";
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};
