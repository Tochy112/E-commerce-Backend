// import { Request, Response, NextFunction } from "express";
// import AuthService from "../../accounts/services/AuthService";
// import { ForbiddenError } from "../error-management/error";

// export default function RoleMiddleware(role: string) {
//   return class {
//     async handle(
//       request: Request,
//       response: Response,
//       next: NextFunction
//     ): Promise<void> {
//       const authService = container.resolve<AuthService>(AuthService.name);
//       const account = await authService.getCurrentAccount(request);

//       const accountRole = account.role;

//       if (accountRole.name == role) next();
//       else
//         throw new ForbiddenError(
//           "Inadequate permissions to carry out this operation"
//         );
//     }
//   };
// }
