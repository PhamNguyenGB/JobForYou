import { JobPostDto } from "../types/jobPost.types";
import jobPostRepo from "../repo/jobPost.repo";

export class JobPostServices {
  createJobPost = async (payload: JobPostDto) => {
    try {
      const jobPost = await jobPostRepo.createJobPost({
        ...payload,
        status: "published",
      });
      return jobPost;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getJobPost = async (page: number, limit: number) => {
    try {
      const jobPosts = await jobPostRepo.getAllJobPosts(page, limit);
      return jobPosts;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getJobPostById = async (jobPostId: number) => {
    try {
      const jobPost = await jobPostRepo.getJobPostById(jobPostId);
      return jobPost;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  updateJobPost = async (jobPostId: number, payload: JobPostDto) => {
    try {
      const jobPost = await jobPostRepo.updateJobPost(jobPostId, payload);
      return jobPost;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  deleteJobPost = async (jobPostId: number, userId: number) => {
    try {
      const jobPost = await jobPostRepo.deleteJobPost(jobPostId, userId);
      return jobPost;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const jobPostServices = new JobPostServices();
export default jobPostServices;
