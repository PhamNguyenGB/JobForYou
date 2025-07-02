import models from "../models";
import { ProfileDto } from "../types/profile.type";
import profileRepo from "../repo/profile.repo";

export class ProfileServices {
  createProfile = async (payload: ProfileDto) => {
    try {
      const profile = await profileRepo.createProfile(payload);
      return profile;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getProfile = async (profileId: number) => {
    try {
      const profile = profileRepo.getProfile(profileId);
      if (profile) {
        return profile;
      }
      return "profile not found";
    } catch (error) {
      console.log(error);
      return;
    }
  };

  updateProfile = async (payload: ProfileDto) => {
    try {
      const profile = await profileRepo.updateProfile(payload);
      return profile;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const profileServices = new ProfileServices();
export default profileServices;
