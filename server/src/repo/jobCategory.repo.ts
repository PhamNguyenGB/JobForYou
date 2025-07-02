import models from "../models";

export class JobCategoryRepo {
  async getAllJobCategories() {
    const jobCategories = await models.JobCategoryModel.findAll();
    return jobCategories;
  }

  async getJobCategoryById(id: number) {
    const jobCategory = await models.JobCategoryModel.findByPk(id);
    return jobCategory;
  }

  async createJobCategory(name: string, description?: string) {
    const jobCategory = await models.JobCategoryModel.create({
      name,
      description,
    });
    return jobCategory;
  }

  async deleteJobCategory(id: number) {
    await models.JobCategoryModel.destroy({
      where: { id },
    });
  }
}

const jobCategoryRepo = new JobCategoryRepo();
export default jobCategoryRepo;
