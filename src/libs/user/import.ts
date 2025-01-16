import baseRequest from "@/libs/axios";
import { ErrorResponse, SuccessResponse } from "@/libs/types/types";

export const getStatus = async (params: string) => {
  const response = await baseRequest("get", "/admin/import-status?" + params);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};
