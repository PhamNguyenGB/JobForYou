import models from "../models";
import { createAdminPayload, updateAdminPayload } from "../types/admin.type";

export class AdminRepo {
  async getAllAdmins() {
    return await models.AdminModel.findAll();
  }

  async getAdminById(id: number) {
    return await models.AdminModel.findOne({ where: { id: id } });
  }

  async createAdmin(payload: createAdminPayload) {
    return await models.AdminModel.create(payload);
  }

  async updateAdmin(id: number, payload: updateAdminPayload) {
    return await models.AdminModel.update(payload, { where: { id: id } });
  }

  async deleteAdmin(id: number) {
    return await models.AdminModel.destroy({ where: { id: id } });
  }
}

export const adminRepo = new AdminRepo();
