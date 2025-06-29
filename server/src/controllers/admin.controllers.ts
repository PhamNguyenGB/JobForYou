import { adminServices } from "../services/admin.services";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    let data = await adminServices.registerAdmin(req.body);
    if (data) {
      res.status(201).json({ message: "create admin success" });
      return;
    }
    res.status(400).json({ message: "create admin fail" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "create admin fail" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    let data = await adminServices.loginAdmin(
      req.body.email,
      req.body.password
    );
    if (data) {
      res.status(200).json({ message: "login success", data: data });
      return;
    }
    res.status(400).json({ message: "login fail" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "login fail" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refresh_token = req.body.refresh_token as string;
    let data = await adminServices.logoutAdmin(refresh_token);
    if (data) {
      res.status(200).json({ message: "logout success" });
      return;
    }
    res.status(400).json({ message: "logout fail" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "logout fail" });
  }
};
