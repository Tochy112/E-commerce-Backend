import { container } from "tsyringe";
import { AccountController } from "./account/controllers/AccountController"
import { RoleMiddleware } from "./utils/middleware/RoleMiddleware";
import { AuthMiddleware } from "./utils/middleware/AuthMiddleware";
// Define route groups with base URLs and controllers
export const RouteGroups = [
  {
    prefix: "/accounts",
    controller: AccountController,
    middlewares: []
  },
];