import models from "../models";

export class JobPostDistrictRepo {
  async createJobPostDistrict(jobPostId: number, districtId: number[]) {
    try {
      for (let i = 0; i < districtId.length; i++) {
        await models.JobPostDistrictModel.create({
          job_post_id: jobPostId,
          district_id: districtId[i],
        });
      }
      return "JobPostDistrict created successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async deleteJobPostDistrict(jobPostId: number, districtId: number[]) {
    try {
      for (let i = 0; i < districtId.length; i++) {
        await models.JobPostDistrictModel.destroy({
          where: { job_post_id: jobPostId, district_id: districtId[i] },
        });
      }
      return "JobPostDistrict deleted successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const jobPostDistrictRepo = new JobPostDistrictRepo();
export default jobPostDistrictRepo;
