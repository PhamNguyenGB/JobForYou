import savedJobRepo from "../repo/savedJob.repo";

export class SavedJobServices {
  createSavedJob = async (user_id: number, job_post_id: number) => {
    try {
      const savedJob = await savedJobRepo.createSavedJob(user_id, job_post_id);
      return savedJob;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  deleteSavedJob = async (user_id: number, job_post_id: number) => {
    try {
      await savedJobRepo.deleteSavedJob(user_id, job_post_id);
      return "SavedJob deleted successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getSavedJob = async (user_id: number) => {
    try {
      const savedJob = await savedJobRepo.getSavedJob(user_id);
      return savedJob;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const savedJobService = new SavedJobServices();
export default savedJobService;
