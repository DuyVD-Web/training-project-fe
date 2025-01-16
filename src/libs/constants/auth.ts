import {
  CREATE_USER,
  GET_IMPORT_STATUS_LIST,
  GET_PERMiSSIONS_LIST,
  GET_USER,
  GET_USER_LIST,
  UPDATE_USER,
  USER_ACCESS_HISTORY,
  USER_INFORMATION,
  USER_SEND_CHANGE_EMAIL,
} from "./permissions";

export const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const routes = [
  {
    path: "/",
    permission: [],
  },
  {
    path: "/user/info",
    permission: [USER_INFORMATION],
    name: "User information",
  },
  {
    path: "/user/email",
    permission: [USER_SEND_CHANGE_EMAIL],
  },
  {
    path: "/user/history",
    permission: [USER_ACCESS_HISTORY],
    name: "Access history",
  },
  {
    path: "/admin/users",
    permission: [GET_USER_LIST],
    name: "Users",
  },
  {
    path: "/admin/user",
    permission: [CREATE_USER],
  },
  {
    path: "/admin/user/:id",
    permission: [GET_USER, UPDATE_USER],
  },
  {
    path: "/admin/import",
    permission: [GET_IMPORT_STATUS_LIST],
    name: "Imports's status",
  },
  {
    path: "/admin/permissions",
    permission: [GET_PERMiSSIONS_LIST],
    name: "Permissions",
  },
];
