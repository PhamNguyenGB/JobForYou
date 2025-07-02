import levelServices from "../services/level.services";
import { Request, Response } from "express";

export class LevelController {
  getAllLevels = async (req: Request, res: Response) => {
    const levels = await levelServices.getAllLevels();
    res.status(200).json(levels);
    return;
  };

  createLevel = async (req: Request, res: Response) => {
    const level = await levelServices.create(req.body);
    res.status(201).json(level);
    return;
  };

  deleteLevel = async (req: Request, res: Response) => {
    const level = await levelServices.deleteLevel(Number(req.params.id));
    res.status(200).json(level);
    return;
  };
}

const levelController = new LevelController();
export default levelController;
