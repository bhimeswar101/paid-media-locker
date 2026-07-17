import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository";

import {
  hashPassword,
  comparePassword,
} from "../utils/hash";

import { signToken } from "../utils/jwt";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser(
    name,
    email,
    hashedPassword
  );

  const token = signToken(user.id);

  return {
    user,
    token,
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await comparePassword(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = signToken(user.id);

  return {
    user,
    token,
  };
};

export const getCurrentUser = async (
  userId: string
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
