import models from "../models";
import { JobPostDto } from "../types/jobPost.types";

export class JobPostRepo {
  async createJobPost(payload: JobPostDto) {
    try {
      const jobPost = await models.JobPostModel.create(payload);
      return jobPost;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getAllJobPosts(page: number, limit: number) {
    try {
      let offset = (page - 1) * limit;
      const jobPosts = await models.JobPostModel.findAll({
        offset: offset,
        limit: limit,
        include: [{ model: models.CompanyModel }, { model: models.UserModel }],
      });
      return jobPosts;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getJobPostById(jobPostId: number) {
    try {
      const jobPost = await models.JobPostModel.findOne({
        where: { id: jobPostId },
        include: [{ model: models.CompanyModel }, { model: models.UserModel }],
      });
      return jobPost;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async deleteJobPost(jobPostId: number, userId: number) {
    try {
      const jobPost = await models.JobPostModel.findByPk(jobPostId);
      if (jobPost) {
        if (jobPost.user_id === userId) {
          await jobPost.destroy();
          return "JobPost deleted successfully";
        }
        throw new Error("You can't delete this job post");
      }
      throw new Error("JobPost not found");
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async updateJobPost(jobPostId: number, payload: JobPostDto) {
    try {
      const jobPost = await models.JobPostModel.findByPk(jobPostId);
      if (!jobPost) {
        throw new Error("JobPost not found");
      }
      const jobPostUpdate = await jobPost.update({
        title: payload.title ? payload.title : jobPost.title,
        description: payload.description
          ? payload.description
          : jobPost.description,
        salary: payload.salary ? payload.salary : jobPost.salary,
        benefits: payload.benefits ? payload.benefits : jobPost.benefits,
        deadline: payload.deadline ? payload.deadline : jobPost.deadline,
        skills: payload.skills ? payload.skills : jobPost.skills,
        education: payload.education ? payload.education : jobPost.education,
        quantity: payload.quantity ? payload.quantity : jobPost.quantity,
        status: payload.status ? payload.status : jobPost.status,
      });
      return jobPostUpdate;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const jobPostRepo = new JobPostRepo();
export default jobPostRepo;
