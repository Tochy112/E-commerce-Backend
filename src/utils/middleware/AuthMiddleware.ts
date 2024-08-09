import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UnauthorizedError } from "../error-management/error";
import AuthService from "../../account/services/AuthService";

export function AuthMiddleware() {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {      
      const authService = container.resolve<AuthService>(AuthService.name);
      const token = request.headers.authorization?.slice(6);

      if (token && (await authService.verifyToken(token))) {
        next();
      } else {
        throw new UnauthorizedError();
      }
    } catch (error) {
      next(error);
    }
  };
}

export function conditionalMiddleware(middleware: any) {
  return (req: Request, res: Response, next: NextFunction) => {    
    if (req.path.startsWith('/v1/auth')) {
      return next();
    }
    return middleware(req, res, next);
  };
}
