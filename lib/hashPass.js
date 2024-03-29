import { hash, compare } from "bcryptjs";

export const hashPassword = async (password) => {
  const hasedPassword = await hash(password, 12);
  return hasedPassword;
};

export const confirmPassword = async (
  password,
  hashedPassword
) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};