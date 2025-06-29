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
    const jobCategories = await models.JobCategoryModel.findAll();
    return jobCategories;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getJobCategoryById = async (id: number) => {
  try {
    const jobCategory = await models.JobCategoryModel.findByPk(id);
    return jobCategory;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createJobCategory = async (name: string, description?: string) => {
  try {
    const jobCategory = await models.JobCategoryModel.create({
      name,
      description,
    });
    return jobCategory;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteJobCategory = async (id: number) => {
  try {
    const jobCategory = await models.JobCategoryModel.destroy({
      where: { id },
    });
    return jobCategory;
  } catch (error) {
    console.log(error);
    return;
  }
};
