import { apiRequest } from "@/libs/axios";
import { PermissionTypeReturn, RolePermissionForm } from "@/libs/types/admin";

export const getPermissions = () =>
  apiRequest<PermissionTypeReturn>("get", "/admin/permissions");

export const patchPermissions = async (data: RolePermissionForm) =>
  apiRequest("patch", "/admin/permissions", data);
