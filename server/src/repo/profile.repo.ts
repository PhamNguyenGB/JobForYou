import models from "../models";
import { ProfileDto } from "../types/profile.type";

export class ProfileRepo {
  async createProfile(payload: ProfileDto) {
    try {
      const profile = await models.ProfileModel.create(payload);
      return profile;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getProfile(profileId: number) {
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
  }

  async updateProfile(payload: ProfileDto) {
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
  }

  async deleteProfile(profileId: number, userId: number) {
    try {
      const profile = await models.ProfileModel.findByPk(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }
      if (profile.user_id === userId) {
        await profile.destroy();
        return "Profile deleted successfully";
      }
      return "You can't delete your profile";
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

const profileRepo = new ProfileRepo();
export default profileRepo;
