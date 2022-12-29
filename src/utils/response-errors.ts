export const WRONG_DATA = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const USER_EXISTS = 409;
export const DEFAULT_ERROR = 500;

export class WrongDataError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = WRONG_DATA;
  }
}

export class UnauthorizedError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = UNAUTHORIZED;
  }
}

export class ForbiddenError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = FORBIDDEN;
  }
}

export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = NOT_FOUND;
  }
}
