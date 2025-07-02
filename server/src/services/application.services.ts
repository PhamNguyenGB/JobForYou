import { ApplicationDto } from "../types/application.types";
import applicationRepo from "../repo/application.repo";

export class ApplicationService {
  async createApplication(payload: ApplicationDto) {
    try {
      const application = await applicationRepo.createApplication({
        ...payload,
        status: "pending",
      });
      return application;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationByUserId(userId: number, page: number, limit: number) {
    try {
      const application = await applicationRepo.getApplicationsByFilter(
        userId,
        page,
        limit
      );
      return application;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationByJobPostId(
    jobPostId: number,
    page: number,
    limit: number
  ) {
    try {
      const application = await applicationRepo.getApplicationsByFilter(
        jobPostId,
        page,
        limit
      );
      return application;
    } catch (error) {
      throw error;
    }
  }
}

const applicationService = new ApplicationService();
export default applicationService;
