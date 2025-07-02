import jobPostLevelRepo from "../repo/jobPostLevel.repo";

export class JobPostLevelServices {
  createJobPostLevel = async (jobPostId: number, levelId: number[]) => {
    try {
      const jobPostLevel = await jobPostLevelRepo.createJobPostLevel(
        jobPostId,
        levelId
      );
      return jobPostLevel;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  deleteJobPostLevel = async (jobPostId: number, levelId: number[]) => {
    try {
      const jobPostLevel = await jobPostLevelRepo.deleteJobPostLevel(
        jobPostId,
        levelId
      );
      return jobPostLevel;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const jobPostLevelServices = new JobPostLevelServices();
export default jobPostLevelServices;
