import argon from "argon2";
import { UsersDb } from "../../model/user.schema";
import { BadRequestError, ServerError, UserError } from "../../utils/app.error";
import genToken from "../../utils/gen.token";

export const register = async (_: any, { input }: any) => {
  delete input.confirm_password;
  input.password = await argon.hash(input.password);
  try {
    const user = await UsersDb.create({ ...input });
    return user;
  } catch (error) {
    throw new ServerError("User not created, try again");
  }
};

export const login = async (_: any, { input }: any) => {
  try {
    const user = await UsersDb.findOne({ email: input.email });
    if (!user) {
      return new BadRequestError("Invalid credentials");
    }
    const valid = await argon.verify(user.password, input.password);
    if (!valid) {
      return new UserError("Invalid credentials");
    }
    return { token: genToken(user.id) };
  } catch (error) {
    throw new ServerError("Login failed, try again");
  }
};
