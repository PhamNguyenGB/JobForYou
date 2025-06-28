import models from "../models";

interface JobCategoryAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getAllJobCategories = async () => {
  try {
    const jobCategories = await models.JobCategory.findAll();
    return jobCategories;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getJobCategoryById = async (id: number) => {
  try {
    const jobCategory = await models.JobCategory.findByPk(id);
    return jobCategory;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createJobCategory = async (name: string, description?: string) => {
  try {
    const jobCategory = await models.JobCategory.create({ name, description });
    return jobCategory;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteJobCategory = async (id: number) => {
  try {
    const jobCategory = await models.JobCategory.destroy({ where: { id } });
    return jobCategory;
  } catch (error) {
    console.log(error);
    return;
  }
};
