import jobCategoryRepo from "../repo/jobCategory.repo";

export class JobCategoryServices {
  getAllJobCategories = async () => {
    try {
      const jobCategories = await jobCategoryRepo.getAllJobCategories();
      return jobCategories;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getJobCategoryById = async (id: number) => {
    try {
      const jobCategory = await jobCategoryRepo.getJobCategoryById(id);
      return jobCategory;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  createJobCategory = async (name: string, description?: string) => {
    try {
      const jobCategory = await jobCategoryRepo.createJobCategory(
        name,
        description
      );
      return jobCategory;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  deleteJobCategory = async (id: number) => {
    try {
      const jobCategory = await jobCategoryRepo.deleteJobCategory(id);
      return jobCategory;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const jobCategoryServices = new JobCategoryServices();
export default jobCategoryServices;
