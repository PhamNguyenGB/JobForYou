import models from "../models";

interface SavedJobAttributes {
  user_id: number;
  job_post_id: number;
}
export const createSavedJob = async (user_id: number, job_post_id: number) => {
  try {
    const savedJob = await models.SavedJobModel.create({
      user_id,
      job_post_id,
    });
    return savedJob;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteSavedJob = async (user_id: number, job_post_id: number) => {
  try {
    await models.SavedJobModel.destroy({
      where: { user_id, job_post_id },
    });
    return "SavedJob deleted successfully";
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getSavedJob = async (user_id: number) => {
  try {
    const savedJob = await models.SavedJobModel.findAll({ where: { user_id } });
    return savedJob;
  } catch (error) {
    console.log(error);
    return;
  }
};
