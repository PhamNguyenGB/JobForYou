import models from "../models";

export class JobPostLevelRepo {
  async createJobPostLevel(jobPostId: number, levelId: number[]) {
    try {
      for (let i = 0; i < levelId.length; i++) {
        await models.JobPostLevelModel.create({
          job_post_id: jobPostId,
          level_id: levelId[i],
        });
      }

      return "JobPostLevel created successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async deleteJobPostLevel(jobPostId: number, levelId: number[]) {
    try {
      for (let i = 0; i < levelId.length; i++) {
        await models.JobPostLevelModel.destroy({
          where: { job_post_id: jobPostId, level_id: levelId[i] },
        });
      }
      await models.JobPostLevelModel.destroy({
        where: { job_post_id: jobPostId, level_id: levelId },
      });
      return "JobPostLevel deleted successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const jobPostLevelRepo = new JobPostLevelRepo();
export default jobPostLevelRepo;
