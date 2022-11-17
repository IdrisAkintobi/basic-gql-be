import { ApolloError } from 'apollo-server-errors';

export class BadRequestError extends ApolloError {
  constructor(message: string) {
    super(message, 'BAD_REQUEST', {statusCode: 400});

    Object.defineProperty(this, 'name', { value: 'BadRequestError' });
  }
}

export class AuthenticationError extends ApolloError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', {statusCode: 401});

    Object.defineProperty(this, 'name', { value: 'AuthorizationError' });
  }
}

export class UserError extends ApolloError {
  constructor(message: string) {
    super(message, 'BAD_USER_INPUT', {statusCode: 400});

    Object.defineProperty(this, 'name', { value: 'UserError' });
  }
}
export class ServerError extends ApolloError {
  constructor(message: string) {
    super(message, 'INTERNAL_SERVER_ERROR', {statusCode: 500});

    Object.defineProperty(this, 'name', { value: 'ServerError' });
  }
}
