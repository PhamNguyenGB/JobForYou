import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const funHashPassWord = (password: string) => {
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const funComparePassWord = (password: string, hash: string) => {
  let isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};
