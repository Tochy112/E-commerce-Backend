import { AccountController } from "./account/controllers/AccountController"
// Define route groups with base URLs and controllers
export const RouteGroups = [
  {
    prefix: "/accounts",
    controller: AccountController,
    middlewares: []
  },
//   {
//     prefix: "/admin/accounts",
//     controller: AdminAccountController,
//   },
];