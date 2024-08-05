import { CustomError } from "./index";
import { StatusCodes } from "http-status-codes"

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(
      message,
      StatusCodes.BAD_REQUEST,
    );
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(
      message,
      StatusCodes.FORBIDDEN,
    );
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(
      message,
      StatusCodes.CONFLICT,
    );
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(
      message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export class UnauthorizedError extends CustomError {
  constructor() {
    super(
      "You are not authorized to carry out this action",
      StatusCodes.UNAUTHORIZED
    );
  }
}

