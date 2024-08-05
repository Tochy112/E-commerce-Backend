import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export class ErrorHandler {
  constructor() {}

  handle(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
      try {
        console.error(error.message);
      } catch (logError) {
        console.log(logError);
      }
      return res.status(error.statusCode).json({ msg: error.message });
    }
    next(error);
  }
}

export class CustomError extends Error {
  constructor(message: string, readonly statusCode: StatusCodes) {
    super(message);
    this.name = CustomError.name;
  }
}
