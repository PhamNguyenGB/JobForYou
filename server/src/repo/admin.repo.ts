import models from "../models";
import { AdminCreateDto, AdminUpdateDto } from "../types/admin.types";

export class AdminRepo {
  async getAllAdmins() {
    return await models.AdminModel.findAll();
  }

  async getAdminById(id: number | undefined) {
    if (!id) return;
    return await models.AdminModel.findOne({ where: { id: id } });
  }

  async getAdminByEmail(email: string) {
    return await models.AdminModel.findOne({ where: { email: email } });
  }

  async createAdmin(payload: AdminCreateDto) {
    return await models.AdminModel.create(payload);
  }

  async updateAdmin(id: number, payload: AdminUpdateDto) {
    return await models.AdminModel.update(payload, { where: { id: id } });
  }

  async deleteAdmin(id: number) {
    return await models.AdminModel.destroy({ where: { id: id } });
  }
}

const adminRepo = new AdminRepo();
export default adminRepo;
