import * as userServices from "../services/user.services";
import { Request, Response } from "express";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    let data = await userServices.getYourInfo(userId);
    if (data) {
      res.status(200).json({ message: "get user info success", data: data });
      return;
    }
    res.status(400).json({ message: "get user info fail" });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "get user info fail" });
    return;
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    let data = await userServices.updateUserInfo(req.body);
    if (data) {
      res.status(200).json({ message: "update user info success", data: data });
      return;
    }
    res.status(400).json({ message: "update user info fail" });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "update user info fail" });
    return;
  }
};
