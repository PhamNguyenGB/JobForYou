import models from "../models";

export const createJobPostLevel = async (
  jobPostId: number,
  levelId: number[]
) => {
  try {
    for (let i = 0; i < levelId.length; i++) {
      await models.JobPostLevel.create({
        job_post_id: jobPostId,
        level_id: levelId[i],
      });
    }

    return "JobPostLevel created successfully";
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteJobPostLevel = async (
  jobPostId: number,
  levelId: number[]
) => {
  try {
    for (let i = 0; i < levelId.length; i++) {
      await models.JobPostLevel.destroy({
        where: { job_post_id: jobPostId, level_id: levelId[i] },
      });
    }
    await models.JobPostLevel.destroy({
      where: { job_post_id: jobPostId, level_id: levelId },
    });
    return "JobPostLevel deleted successfully";
  } catch (error) {
    console.log(error);
    return;
  }
};
