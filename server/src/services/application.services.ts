import models from "../models";

interface ApplicationAttributes {
  id?: number;
  user_id: number;
  job_post_id: number;
  status: string;
  file_cv?: string;
  note?: string;
}

export const createApplication = async (payload: ApplicationAttributes) => {
  try {
    const application = await models.ApplicationModel.create({
      ...payload,
      status: "pending",
    });
    return application;
  } catch (error) {
    throw error;
  }
};

export const getApplicationByUserId = async (
  userId: number,
  page: number,
  limit: number
) => {
  try {
    let offset = (page - 1) * limit;
    const application = await models.ApplicationModel.findAll({
      offset: offset,
      limit: limit,
      where: { user_id: userId },
    });
    return application;
  } catch (error) {
    throw error;
  }
};

export const getApplicationByJobPostId = async (
  jobPostId: number,
  page: number,
  limit: number
) => {
  try {
    let offset = (page - 1) * limit;
    const application = await models.ApplicationModel.findAll({
      offset: offset,
      limit: limit,
      where: { job_post_id: jobPostId },
    });
    return application;
  } catch (error) {
    throw error;
  }
};
