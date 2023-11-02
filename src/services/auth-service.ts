import { Prisma } from "@prisma/client";
import prismaClient from "../cores/db";

import { ErrorType, StandardError } from "../errors/standard-error";
import { hashPassword, isPasswordValid } from "../utils/password";
import { generateAccessTokenAndFingerprint } from "../utils/token";

const signup = async (
  data: Prisma.UserCreateInput,
): Promise<{ userId: number; username: string }> => {
  // If username already exists throw error
  if (
    (await prismaClient.user.findUnique({
      where: {
        username: data.username,
      },
    })) !== null
  ) {
    throw new StandardError(ErrorType.USERNAME_ALREADY_EXISTS);
  }

  try {
    // Hash the password
    const hashedPassword: string = await hashPassword(data.password);

    return await prismaClient.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
      select: {
        userId: true,
        username: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

const login = async (data: { username: string; password: string }) => {
  const user = await prismaClient.user.findUnique({
    where: {
      username: data.username,
    },
  });

  // If username not found, throw error
  if (user === null) {
    throw new StandardError(ErrorType.USER_NOT_FOUND);
  }

  // If wrong password, throw error
  if (!(await isPasswordValid(user.password, data.password))) {
    throw new StandardError(ErrorType.WRONG_PASSWORD);
  }

  try {
    return await generateAccessTokenAndFingerprint({
      userId: user.userId,
      username: user.username,
    });
  } catch (error) {
    throw error;
  }
};

export { signup, login };
