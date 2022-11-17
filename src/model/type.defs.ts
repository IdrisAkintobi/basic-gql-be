import { gql } from "apollo-server-express";
const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Token {
    token: String!
  }

  input createInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirm_password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input changePasswordInput {
    newPassword: String!
    confirm_password: String!
  }

  input idInput {
    id: String!
  }

  type Query {
    user(input: idInput): User
  }

  type Mutation {
    register(input: createInput): User!
    login(input: loginInput): Token!
    changePassword(input: changePasswordInput): User!
  }
`;

export default typeDefs;
