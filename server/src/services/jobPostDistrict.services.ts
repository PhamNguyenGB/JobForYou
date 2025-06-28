import models from "../models";

export const createJobPostDistrict = async (
  jobPostId: number,
  districtId: number[]
) => {
  try {
    for (let i = 0; i < districtId.length; i++) {
      await models.JobPostDistrict.create({
        job_post_id: jobPostId,
        district_id: districtId[i],
      });
    }
    return "JobPostDistrict created successfully";
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteJobPostDistrict = async (
  jobPostId: number,
  districtId: number[]
) => {
  try {
    for (let i = 0; i < districtId.length; i++) {
      await models.JobPostDistrict.destroy({
        where: { job_post_id: jobPostId, district_id: districtId[i] },
      });
    }
    return "JobPostDistrict deleted successfully";
  } catch (error) {
    console.log(error);
    return;
  }
};
