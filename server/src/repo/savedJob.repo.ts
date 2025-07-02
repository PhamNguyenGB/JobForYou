import models from "../models";

export class SavedJobRepo {
  async createSavedJob(user_id: number, job_post_id: number) {
    try {
      const savedJob = await models.SavedJobModel.create({
        user_id,
        job_post_id,
      });
      return savedJob;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getSavedJob(user_id: number) {
    try {
      const savedJob = await models.SavedJobModel.findAll({
        where: { user_id },
      });
      return savedJob;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async deleteSavedJob(user_id: number, job_post_id: number) {
    try {
      await models.SavedJobModel.destroy({
        where: { user_id, job_post_id },
      });
      return "SavedJob deleted successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const savedJobRepo = new SavedJobRepo();
export default savedJobRepo;
