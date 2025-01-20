import baseRequest from "@/libs/axios";
import { ErrorResponse, PaginationResponse } from "@/libs/types/types";
import { ImportStatusReturn } from "../types/import";

export const getStatus = async (params: string) => {
  const response = await baseRequest("get", "/admin/import-status?" + params);
  return response.status
    ? (response as PaginationResponse<ImportStatusReturn>)
    : (response as ErrorResponse);
};
