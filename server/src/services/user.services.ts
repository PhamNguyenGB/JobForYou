import userRepo from "../repo/user.repo";
import { UserUpdateDto } from "../types/user.types";

export class UserServices {
  getYourInfo = (userId: number) => {
    try {
      const user = userRepo.findByPK(userId);
      if (user) {
        return user;
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  updateUserInfo = async (payload: UserUpdateDto, userId: number) => {
    try {
      const user = await userRepo.update(payload, userId);
      return user;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const userServices = new UserServices();
export default userServices;
