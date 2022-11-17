import argon from "argon2";
import { UsersDb } from "../../model/user.schema";
import { ServerError } from "../../utils/app.error";

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

export const deleteAccount = async (_: any, __: any, { user }: any) => {
  try {
    await UsersDb.findByIdAndDelete(user.id);
    return user;
  } catch (error) {
    throw new ServerError("Account not deleted, try again");
  }
};
