import baseRequest from "../axios";
import { RolePermissionForm } from "../types/admin";
import { ErrorResponse, SuccessResponse } from "../types/types";

export const getPermissions = async () => {
  const response = await baseRequest("get", "/admin/permissions");
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};

export const patchPermissions = async (data: RolePermissionForm) => {
  const response = await baseRequest("patch", "/admin/permissions", data);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};
