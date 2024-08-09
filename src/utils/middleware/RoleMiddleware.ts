import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../error-management/error";
import { container } from "tsyringe";
import AuthService from "../../account/services/AuthService";

export function RoleMiddleware(...allowedRoles: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authService = container.resolve<AuthService>(AuthService.name);
      const account = await authService.getCurrentAccount(request);

      const accountRole = account.role.name;

      if (allowedRoles.includes(accountRole)) {
        next();
      } else {
        throw new ForbiddenError(
          "Inadequate permissions to carry out this operation"
        );
      }
    } catch (error) {
      next(error);
    }
  };
}