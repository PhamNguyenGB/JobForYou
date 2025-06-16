import * as authService from "../services/auth.services";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
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

export const login = async (req: Request, res: Response): Promise<void> => {
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
