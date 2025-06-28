import * as levelServices from "../services/level.services";
import { Request, Response } from "express";

export const getAllLevels = async (req: Request, res: Response) => {
  const levels = await levelServices.getAllLevels();
  res.status(200).json(levels);
  return;
};

export const createLevel = async (req: Request, res: Response) => {
  const level = await levelServices.create(req.body);
  res.status(201).json(level);
  return;
};

export const deleteLevel = async (req: Request, res: Response) => {
  const level = await levelServices.deleteLevel(Number(req.params.id));
  res.status(200).json(level);
  return;
};
