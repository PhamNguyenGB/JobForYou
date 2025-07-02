import adminRepo from "../repo/admin.repo";
import authService from "./auth.services";
import { funHashPassWord, funComparePassWord } from "../utils/bcrypt.util";
import { AdminDTO, AdminCreateDto, AdminUpdateDto } from "../types/admin.types";
import { TokenDto } from "../types/token.types";
import tokenRepo from "../repo/token.repo";

export class AdminService {
  async registerAdmin(payload: AdminCreateDto) {
    try {
      let hashPass = await funHashPassWord(payload.password);
      const admin = await adminRepo.createAdmin({
        ...payload,
        password: hashPass,
      });
      return admin;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async loginAdmin(email: string, password: string) {
    try {
      const admin = await adminRepo.getAdminByEmail(email);
      if (admin) {
        if (funComparePassWord(password, admin.password)) {
          const payload: Omit<AdminDTO, "password"> = {
            name: admin.name,
            email: admin.email,
            id: admin.id,
            role: "admin",
          };
          const token = await authService.generateAccessToken(payload);
          const refresh_token = (await authService.generateRefreshToken(
            payload
          )) as string;

          const expiresAt = new Date(
            Date.now() + 1000 * Number(process.env.JWT_EXPIRES_REFRESH_IN)
          );

          const dataToken: TokenDto = {
            user_id: undefined,
            admin_id: admin.id,
            refresh_token: refresh_token,
            type: "admin",
            is_revoked: false,
            expires_at: expiresAt,
          };
          await authService.createToken(dataToken);
          return { token, refresh_token, admin };
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async logoutAdmin(refresh_token: string) {
    try {
      await tokenRepo.updateToken(refresh_token);
      return "logout success";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const adminServices = new AdminService();
export default adminServices;
