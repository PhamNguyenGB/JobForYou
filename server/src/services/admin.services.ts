import models from "../models";
import { adminRepo } from "../repo/admin.repo";
import {
  generateAccessToken,
  generateRefreshToken,
  createToken,
} from "./auth.services";
import { funHashPassWord, funComparePassWord } from "../utils/bcrypt.util";
import {
  AdminAttributes,
  CreateAdminPayload,
  UpdateAdminPayload,
} from "../types/admin.type";

interface TokenAttributes {
  id?: number;
  user_id?: number;
  admin_id?: number;
  refresh_token: string;
  type: string;
  is_revoked: boolean;
  expires_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// const checkEmail = async (email: string) => {
//   const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//   if (emailReg.test(String(email).toLowerCase()) === true) {
//     let user = await models.UserModel.findOne({
//       where: { email: email },
//     });
//     if (user) {
//       return "email is exist";
//     }
//     return true;
//   }

//   return "email is not valid";
// };

export class AdminService {
  async registerAdmin(payload: CreateAdminPayload) {
    try {
      // let email = await checkEmail(payload.email);

      // if (email !== true) {
      //   console.log(email);
      //   return;
      // }
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
      const admin = await models.AdminModel.findOne({
        where: { email: email },
      });
      if (admin) {
        if (funComparePassWord(password, admin.password)) {
          const payload: Omit<AdminAttributes, "password"> = {
            name: admin.name,
            email: admin.email,
            id: admin.id,
            role: "admin",
          };
          const token = await generateAccessToken(payload);
          const refresh_token = (await generateRefreshToken(payload)) as string;

          const expiresAt = new Date(
            Date.now() + 1000 * Number(process.env.JWT_EXPIRES_REFRESH_IN)
          );

          const dataToken: TokenAttributes = {
            user_id: undefined,
            admin_id: admin.id,
            refresh_token: refresh_token,
            type: "admin",
            is_revoked: false,
            expires_at: expiresAt,
          };
          await createToken(dataToken);
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
      await models.TokenModel.update(
        { is_revoked: true },
        { where: { refresh_token } }
      );
      return "logout success";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export const adminServices = new AdminService();
