import models from "../models";
import { LevelDto } from "../types/level.types";

export class LevelRepo {
  async createJobPostLevel(payload: LevelDto) {
    try {
      const jobPostLevel = await models.LevelModel.create(payload);
      return jobPostLevel;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getAllLevels() {
    try {
      const levels = await models.LevelModel.findAll();
      return levels;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async deleteLevel(id: number) {
    try {
      const level = await models.LevelModel.findByPk(id);
      if (!level) {
        throw new Error("Level not found");
      }
      await level.destroy();
      return "Level deleted successfully";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const levelRepo = new LevelRepo();
export default levelRepo;
