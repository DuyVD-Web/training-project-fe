import { apiRequest } from "@/libs/axios";
import { RolePermissionForm } from "@/libs/types/admin";

export const getPermissions = () => apiRequest("get", "/admin/permissions");

export const patchPermissions = async (data: RolePermissionForm) =>
  apiRequest("patch", "/admin/permissions", data);
