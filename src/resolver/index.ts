import { login, register } from "./mutation/auth";
import { changePassword, deleteAccount } from "./mutation/mod.user";
import { user } from "./query/user";

const resolver = {
  Query: {
    user,
  },
  Mutation: {
    register,
    login,
    changePassword,
    deleteAccount,
  },
};

export default resolver;
