import jwt from "jsonwebtoken";
import { AdminDTO } from "../types/admin.types";
import { TokenDto } from "../types/token.types";
import { UserDto, UserCreateDto } from "../types/user.types";
import userRepo from "../repo/user.repo";
import { funHashPassWord, funComparePassWord } from "../utils/bcrypt.util";
import adminRepo from "../repo/admin.repo";
import tokenRepo from "../repo/token.repo";

require("dotenv").config();

export class AuthService {
  registerUser = async (payload: UserCreateDto) => {
    try {
      let hashPass = await funHashPassWord(payload.password);
      let data = {
        ...payload,
        password: hashPass,
      };
      const user = await userRepo.create(data);
      return user;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  loginUser = async (email: string, password: string) => {
    try {
      const user = await userRepo.findUserByEmail(email);
      if (user) {
        if (funComparePassWord(password, user.password)) {
          const payload: Omit<UserDto, "password"> = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user.id,
          };
          const token = await this.generateAccessToken(payload);
          const refresh_token = (await this.generateRefreshToken(
            payload
          )) as string;

          const expiresAt = new Date(
            Date.now() + 1000 * Number(process.env.JWT_EXPIRES_REFRESH_IN)
          );

          const dataToken: TokenDto = {
            user_id: user.id,
            admin_id: undefined,
            refresh_token: refresh_token,
            type: "user",
            is_revoked: false,
            expires_at: expiresAt,
          };
          await this.createToken(dataToken);

          const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user.id,
            token,
            refresh_token,
          };

          return data;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  generateAccessToken = async (
    payload: Omit<UserDto, "password"> | Omit<AdminDTO, "password">
  ) => {
    let keyPrivate = process.env.JWT_SECRET as string;
    let token = null;
    let exprires_in = Number(process.env.JWT_EXPIRES_IN);
    try {
      token = jwt.sign(payload, keyPrivate, {
        expiresIn: exprires_in,
      });
      return token;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  generateRefreshToken = async (
    payload: Omit<UserDto, "password"> | Omit<AdminDTO, "password">
  ) => {
    let keyPrivate = process.env.JWT_SECRET_REFRESH as string;
    let refresh_token = null;
    let exprires_in = Number(process.env.JWT_EXPIRES_REFRESH_IN);
    try {
      refresh_token = jwt.sign(payload, keyPrivate, {
        expiresIn: exprires_in,
      });
      return refresh_token;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  createToken = async (payload: TokenDto) => {
    try {
      await tokenRepo.createToken({
        user_id: payload.user_id,
        admin_id: payload.admin_id,
        refresh_token: payload.refresh_token,
        type: payload.type,
        is_revoked: false,
        expires_at: payload.expires_at,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  refreshAccessToken = async (refreshToken: string) => {
    try {
      const token = await tokenRepo.findOneToken(refreshToken);
      if (token) {
        if (token.is_revoked === false && token.expires_at > new Date()) {
          let userOrAdmin;
          let userPhone;
          let userRole;
          if (token.type === "user") {
            userOrAdmin = await userRepo.findByPK(token.user_id);
            if (userOrAdmin) {
              userPhone = userOrAdmin.phone;
              userRole = userOrAdmin.role;
            }
          } else userOrAdmin = await adminRepo.getAdminById(token.admin_id);

          if (!userOrAdmin) return null;

          let payload: Omit<UserDto, "password"> | Omit<AdminDTO, "password"> =
            {
              name: userOrAdmin.name,
              email: userOrAdmin.email,
              phone: userPhone ? userPhone : "",
              role: userRole ? userRole : "",
              id: userOrAdmin.id,
            };

          const accessToken = await this.generateAccessToken(payload);
          return accessToken;
        }
      }
      return "refresh token is not valid";
    } catch (error) {
      console.log(error);
      return;
    }
  };

  logoutUser = async (refresh_token: string) => {
    try {
      await tokenRepo.updateToken(refresh_token);
      return "logout success";
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const authService = new AuthService();
export default authService;
