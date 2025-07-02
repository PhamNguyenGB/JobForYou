import models from "../models";
import jobPostDistrictRepo from "../repo/jobPostDistrict.repo";

export class JobPostDistrictServices {
  createJobPostDistrict = async (jobPostId: number, districtId: number[]) => {
    try {
      const jobPostDistrict = await jobPostDistrictRepo.createJobPostDistrict(
        jobPostId,
        districtId
      );
      return jobPostDistrict;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  deleteJobPostDistrict = async (jobPostId: number, districtId: number[]) => {
    try {
      const jobPostDistrict = await jobPostDistrictRepo.deleteJobPostDistrict(
        jobPostId,
        districtId
      );
      return jobPostDistrict;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const jobPostDistrictServices = new JobPostDistrictServices();
export default jobPostDistrictServices;
