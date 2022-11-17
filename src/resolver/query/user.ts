import argon from "argon2";
import { UsersDb } from "../../model/user.schema";
import { ServerError } from "../../utils/app.error";

export const user = (_: any, __: any, { user }: any) => {
  return user;
};

export const changePassword = async (_: any, { input }: any, { user }: any) => {
  try {
    const { newPassword } = input;
    const hash = await argon.hash(newPassword);
    const updatedUser = await UsersDb.findByIdAndUpdate(user.id, {
      password: hash,
    });
    return updatedUser?.toJSON();
  } catch (error) {
    throw new ServerError("Password not changed, try again");
  }
};
