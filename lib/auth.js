import { compare, hash } from "bcryptjs";

export const encryptPassword = async (password) => {
  return await hash(password, 12);
};

export const verifyPassword = async (encryptedPassword, password) => {
  return await compare(encryptedPassword, password);
};
