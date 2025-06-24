import { Company, JobPost, User } from "../models";

interface JobPostAttributes {
  id?: number;
  company_id: number;
  title: string;
  description: string;
  salary?: string;
  benefits?: string;
  deadline: Date;
  skills?: string;
  education?: string;
  quantity?: number;
  status: string;
  user_id?: number;
  category_id?: number;
}

export const createJobPost = async (payload: JobPostAttributes) => {
  try {
    const jobPost = await JobPost.create({
      ...payload,
      status: "published",
    });
    return jobPost;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getJobPost = async (page: number, limit: number) => {
  try {
    let offset = (page - 1) * limit;
    const jobPosts = await JobPost.findAll({
      offset: offset,
      limit: limit,
      include: [{ model: Company }, { model: User }],
    });
    return jobPosts;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getJobPostById = async (jobPostId: number) => {
  try {
    const jobPost = await JobPost.findOne({
      where: { id: jobPostId },
      include: [{ model: Company }, { model: User }],
    });
    return jobPost;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateJobPost = async (
  jobPostId: number,
  payload: JobPostAttributes
) => {
  try {
    const jobPost = await JobPost.findOne({ where: { id: jobPostId } });
    if (jobPost) {
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
    }
    return "JobPost not found";
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteJobPost = async (jobPostId: number, userId: number) => {
  try {
    const jobPost = await JobPost.findOne({ where: { id: jobPostId } });
    if (jobPost) {
      if (jobPost.user_id === userId) {
        const jobPostDelete = await jobPost.destroy();
        return "JobPost deleted successfully";
      }
      return "You can't delete this job post";
    }
    return "JobPost not found";
  } catch (error) {
    console.log(error);
    return;
  }
};
