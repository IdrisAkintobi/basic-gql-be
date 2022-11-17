import { login, register } from "./mutation/auth";
import { changePassword, user } from "./query/user";

const resolver = {
  Query: {
    user,
  },
  Mutation: {
    register,
    login,
    changePassword,
  },
};

export default resolver;
