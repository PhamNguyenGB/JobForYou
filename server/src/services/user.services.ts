import models from "../models";
import bcrypt from "bcryptjs";

interface infoUser {
  id: number;
  name?: string;
  phone?: string;
  passOld?: string;
  passNew?: string;
}

export const getYourInfo = (userId: number) => {
  try {
    const user = models.UserModel.findOne({ where: { id: userId } });
    if (user) {
      return user;
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateUserInfo = async (payload: infoUser) => {
  try {
    const user = await models.UserModel.findOne({ where: { id: payload.id } });
    if (user) {
      if (payload.passOld && payload.passNew) {
        const isMatch = bcrypt.compareSync(payload.passOld, user.password);
        if (isMatch === true) {
          const hashPass = bcrypt.hashSync(payload.passNew, 10);
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
};
