import { ApplicationDto } from "../types/application.types";
import models from "../models";

export class ApplicationRepo {
  async createApplication(payload: ApplicationDto) {
    return await models.ApplicationModel.create(payload);
  }

  async getApplicationsByFilter(
    userId?: number,
    jobPostId?: number,
    page = 1,
    limit = 10
  ) {
    const whereClause: any = {};
    if (userId) whereClause.user_id = userId;
    if (jobPostId) whereClause.job_post_id = jobPostId;
    return await models.ApplicationModel.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      where: whereClause,
    });
  }
}

const applicationRepo = new ApplicationRepo();
export default applicationRepo;
