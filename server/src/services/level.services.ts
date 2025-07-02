import { LevelDto } from "../types/level.types";
import levelRepo from "../repo/level.repo";

export class LevelServices {
  getAllLevels = async () => {
    try {
      const levels = await levelRepo.getAllLevels();
      return levels;
    } catch (error) {
      console.error("Error getting all levels:", error);
      throw error;
    }
  };

  create = async (payload: LevelDto) => {
    try {
      const level = await levelRepo.createJobPostLevel(payload);
      return level;
    } catch (error) {
      console.error("Error creating level:", error);
      throw error;
    }
  };

  deleteLevel = async (id: number) => {
    try {
      const level = await levelRepo.deleteLevel(id);
      return level;
    } catch (error) {
      console.error("Error deleting level:", error);
      throw error;
    }
  };
}

const levelServices = new LevelServices();
export default levelServices;
