import models from "../models";
import { UserCreateDto, UserUpdateDto } from "../types/user.types";
import { funComparePassWord, funHashPassWord } from "../utils/bcrypt.util";

export class UserRepo {
  async create(data: UserCreateDto) {
    return models.UserModel.create(data);
  }
  async update(payload: UserUpdateDto, userId: number) {
    try {
      const user = await models.UserModel.findOne({
        where: { id: userId },
      });
      if (user) {
        if (payload.passOld && payload.passNew) {
          const isMatch = funComparePassWord(payload.passOld, user.password);
          if (isMatch === true) {
            const hashPass = funHashPassWord(payload.passNew);
            await user.update({
              name: payload.name,
              phone: payload.phone,
              password: hashPass,
            });
            return user;
          }
          return "password is not correct";
        }
        await user.update({
          name: payload.name,
          phone: payload.phone,
        });
        return user;
      }
      return "User not found";
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findByPK(id: number | undefined) {
    if (!id) return;
    return models.UserModel.findByPk(id);
  }

  async findUserByEmail(email: string) {
    return models.UserModel.findOne({ where: { email: email } });
  }
}

const userRepo = new UserRepo();

export default userRepo;
