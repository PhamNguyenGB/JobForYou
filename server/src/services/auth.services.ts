import models from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

require("dotenv").config();

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
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

interface AdminAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
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

export const registerUser = async (payload: UserAttributes) => {
  try {
    let email = await checkEmail(payload.email);

    if (email !== true) {
      console.log(email);
      return;
    }
    let hashPass = await funHashPassWord(payload.password);
    const user = await models.User.create({ ...payload, password: hashPass });
    return user;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await models.User.findOne({
      where: { email: email },
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const payload: Omit<UserAttributes, "password"> = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          id: user.id,
        };
        const token = await generateAccessToken(payload);
        const refresh_token = (await generateRefreshToken(payload)) as string;

        const expiresAt = new Date(
          Date.now() + 1000 * Number(process.env.JWT_EXPIRES_REFRESH_IN)
        );

        const dataToken: TokenAttributes = {
          user_id: user.id,
          admin_id: undefined,
          refresh_token: refresh_token,
          type: "user",
          is_revoked: false,
          expires_at: expiresAt,
        };
        await createToken(dataToken);

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

export const generateAccessToken = async (
  payload: Omit<UserAttributes, "password"> | Omit<AdminAttributes, "password">
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

export const generateRefreshToken = async (
  payload: Omit<UserAttributes, "password"> | Omit<AdminAttributes, "password">
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

export const createToken = async (payload: TokenAttributes) => {
  try {
    await models.Token.create({
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

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const token = await models.Token.findOne({
      where: { refresh_token: refreshToken },
    });
    if (token) {
      if (token.is_revoked === false && token.expires_at > new Date()) {
        let userOrAdmin;
        let userPhone;
        let userRole;
        if (token.type === "user") {
          userOrAdmin = await models.User.findByPk(token.user_id);
          if (userOrAdmin) {
            userPhone = userOrAdmin.phone;
            userRole = userOrAdmin.role;
          }
        } else userOrAdmin = await models.Admin.findByPk(token.admin_id);

        if (!userOrAdmin) return null;

        let payload:
          | Omit<UserAttributes, "password">
          | Omit<AdminAttributes, "password"> = {
          name: userOrAdmin.name,
          email: userOrAdmin.email,
          phone: userPhone ? userPhone : "",
          role: userRole ? userRole : "",
          id: userOrAdmin.id,
        };

        const accessToken = await generateAccessToken(payload);
        return accessToken;
      }
    }
    return "refresh token is not valid";
  } catch (error) {
    console.log(error);
    return;
  }
};

export const logoutUser = async (refresh_token: string) => {
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
