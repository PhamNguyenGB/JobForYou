import models from "../models";

interface ProfileAttributes {
  id: number;
  user_id: number;
  gender?: string;
  phone?: string;
  cv_file?: string;
}

export const createProfile = async (payload: ProfileAttributes) => {
  try {
    const profile = await models.ProfileModel.create(payload);
    return profile;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getProfile = async (profileId: number) => {
  try {
    const profile = await models.ProfileModel.findOne({
      where: { id: profileId },
    });
    if (profile) {
      return profile;
    }
    return "profile not found";
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateProfile = async (payload: ProfileAttributes) => {
  try {
    const existingProfile = await models.ProfileModel.findOne({
      where: { id: payload.id },
    });

    if (!existingProfile) {
      return "profile not found";
    }

    if (existingProfile.user_id === payload.user_id) {
      return "You can't update your profile";
    }

    const profile = await existingProfile.update({
      gender: payload.gender ? payload.gender : existingProfile.gender,
      phone: payload.phone ? payload.phone : existingProfile.phone,
      cv_file: payload.cv_file ? payload.cv_file : existingProfile.cv_file,
    });
    return profile;
  } catch (error) {
    console.log(error);
    return;
  }
};
