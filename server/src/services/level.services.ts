import models from "../models";

interface LevelAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getAllLevels = async () => {
  try {
    const levels = await models.LevelModel.findAll();
    return levels;
  } catch (error) {
    console.error("Error getting all levels:", error);
    throw error;
  }
};

export const create = async (payload: LevelAttributes) => {
  try {
    const level = await models.LevelModel.create(payload);
    return level;
  } catch (error) {
    console.error("Error creating level:", error);
    throw error;
  }
};

export const deleteLevel = async (id: number) => {
  try {
    const level = await models.LevelModel.findByPk(id);
    if (!level) {
      throw new Error("Level not found");
    }
    await level.destroy();
    return "Level deleted successfully";
  } catch (error) {
    console.error("Error deleting level:", error);
    throw error;
  }
};
