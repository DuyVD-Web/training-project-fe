import { apiRequest } from "../axios";
import { RolePermissionForm } from "../types/admin";

export const getPermissions = () => apiRequest("get", "/admin/permissions");

export const patchPermissions = async (data: RolePermissionForm) =>
  apiRequest("patch", "/admin/permissions", data);
