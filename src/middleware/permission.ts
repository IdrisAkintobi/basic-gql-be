import { and, inputRule, rule, shield } from "graphql-shield";
import { UsersDb } from "../model/user.schema";
import { AuthenticationError } from "../utils/app.error";

//Password validator regex pattern & error message
const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
const PasswordError =
  "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";

const isAuthenticated = rule({ cache: true })(async (_, __, ctx) => {
  if (!ctx.userId) throw new AuthenticationError("Please login to continue");
  const user = await UsersDb.findById(ctx.userId);
  if (!user) throw new AuthenticationError("Invalid credentials");
  ctx.user = user.toJSON();
  return true;
});

const validateLogin = inputRule()((yup) =>
  yup
    .object({
      input: yup.object({
        email: yup.string().email("Enter valid email").required(),
        password: yup.string().required(),
      }),
    })
    .strict(true)
);

const validateRegister = inputRule()((yup) =>
  yup
    .object({
      input: yup.object({
        fullName: yup
          .string()
          .trim("Remove trailing spaces")
          .required("Enter firstName"),
        email: yup.string().email("Enter valid email").required(),
        password: yup
          .string()
          .matches(PasswordRegex, PasswordError)
          .required("Password is required"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords must match")
          .required("Confirm password is required"),
        category: yup
          .string()
          .oneOf(["USER", "BUSINESS", "CUSTOMER"])
          .default("USER"),
      }),
    })
    .strict(true)
);

const validateChangePassword = inputRule()((yup) =>
  yup
    .object({
      input: yup.object({
        newPassword: yup
          .string()
          .matches(PasswordRegex, PasswordError)
          .required("Password is required"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("newPassword")], "Passwords must match")
          .required("Confirm password is required"),
      }),
    })
    .strict(true)
);

// Permissions
const permissions = shield(
  {
    Query: {
      user: isAuthenticated,
    },
    Mutation: {
      register: validateRegister,
      login: validateLogin,
      deleteAccount: isAuthenticated,
      changePassword: and(isAuthenticated, validateChangePassword),
    },
  },
  { debug: true }
);

export default permissions;
