import authService from "../services/auth.services";
import { Request, Response } from "express";

export class AuthController {
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      let data = await authService.registerUser(req.body);
      if (data) {
        res.status(201).json({ message: "create user success" });
        return;
      }
      res.status(400).json({ message: "create user fail" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "create user fail" });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      let data = await authService.loginUser(req.body.email, req.body.password);
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

  refresh_token = async (req: Request, res: Response): Promise<void> => {
    try {
      const refresh_token = req.body.refresh_token as string;
      let data = await authService.refreshAccessToken(refresh_token);
      if (data) {
        res.status(200).json({ message: "refresh token success", data: data });
        return;
      } else if ((data = "refresh token is not valid")) {
        res.status(400).json({ message: "refresh token is not valid" });
        return;
      }
      res.status(400).json({ message: "refresh token fail" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "refresh token fail" });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const refresh_token = req.body.refresh_token as string;
      let data = await authService.logoutUser(refresh_token);
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
}

const authController = new AuthController();
export default authController;
