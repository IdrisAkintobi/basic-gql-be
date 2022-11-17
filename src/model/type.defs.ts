import { gql } from "apollo-server-express";
const typeDefs = gql`
  type User {
    id: String!
    fullName: String!
    email: String!
    category: Category!
  }

  type Token {
    token: String!
  }

  input registerInput {
    fullName: String!
    category: Category!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input changePasswordInput {
    newPassword: String!
    confirmPassword: String!
  }

  input idInput {
    id: String!
  }

  type Query {
    user(input: idInput): User
  }

  enum Category {
    USER
    BUSINESS
    CUSTOMER
  }

  type Mutation {
    register(input: registerInput): User!
    login(input: loginInput): Token!
    changePassword(input: changePasswordInput): User!
    deleteAccount: User!
  }
`;

export default typeDefs;
