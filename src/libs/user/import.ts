import baseRequest from "../axios";
import { ErrorResponse, SuccessResponse } from "../types/types";

export const getStatus = async (params: string) => {
  const response = await baseRequest("get", "/admin/import-status?" + params);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};
