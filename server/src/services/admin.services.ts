import models from "../models";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  createToken,
} from "./auth.services";

interface AdminAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (password: string) => {
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

const checkEmail = async (email: string) => {
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (emailReg.test(String(email).toLowerCase()) === true) {
    let user = await models.User.findOne({
      where: { email: email },
    });
    if (user) {
      return "email is exist";
    }
    return true;
  }

  return "email is not valid";
};

export const registerAdmin = async (payload: AdminAttributes) => {
  try {
    let email = await checkEmail(payload.email);

    if (email !== true) {
      console.log(email);
      return;
    }
    let hashPass = await funHashPassWord(payload.password);
    const admin = await models.Admin.create({ ...payload, password: hashPass });
    return admin;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const admin = await models.Admin.findOne({
      where: { email: email },
    });
    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
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
};

export const logoutAdmin = async (refresh_token: string) => {
  try {
    await models.Token.update(
      { is_revoked: true },
      { where: { refresh_token } }
    );
    return "logout success";
  } catch (error) {
    console.log(error);
    return;
  }
};
