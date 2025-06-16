import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { log } from "util";

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
  id: number;
  user_id?: number;
  admin_id?: number;
  refresh_token: string;
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
    let user = await User.findOne({
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
    const user = await User.create({ ...payload, password: hashPass });
    return user;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({
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
        const refresh_token = await generateRefreshToken(payload);

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

const generateAccessToken = async (
  payload: Omit<UserAttributes, "password">
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

const generateRefreshToken = async (
  payload: Omit<UserAttributes, "password">
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

const refreshAccessToken = async (refreshToken: string) => {
  // verify & generate new access token
};
