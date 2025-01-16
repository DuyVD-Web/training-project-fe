import baseRequest, { apiRequest } from "@/libs/axios.ts";
import {
  ErrorResponse,
  PaginationResponse,
  SuccessResponse,
} from "../types/types.ts";
import {
  ChangeAvatarResponse,
  ChangeEmailFormInput,
  ChangePasswordFormInput,
  EditInfoFormInput,
  EditUserForm,
  UserInfor,
} from "../types/user.ts";

export const getUser = () => apiRequest("get", "/user");

export const updateUserInfo = async (data: EditInfoFormInput) => {
  const response = await baseRequest("put", "/user", data);
  return response.status
    ? (response.data.user as UserInfor)
    : (response as ErrorResponse);
};

export const changePassword = async (data: ChangePasswordFormInput) => {
  const response = await baseRequest("put", "/user/password", data);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};

export const changeEmail = async (data: ChangeEmailFormInput) => {
  const response = await baseRequest("post", "/user/email", data);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};

export const updateAvatar = async (data: FormData) => {
  const response = await baseRequest("post", "/user/avatar", data);
  return response.status
    ? (response as ChangeAvatarResponse)
    : (response as ErrorResponse);
};

export const getHistory = async (params: string) => {
  const response = await baseRequest("get", "/user/access-history" + params);
  return response.status
    ? (response as PaginationResponse)
    : (response as ErrorResponse);
};

export const getUsers = async (params: string) => {
  const response = await baseRequest("get", "/admin/users" + params);
  return response.status
    ? (response as PaginationResponse)
    : (response as ErrorResponse);
};

export const deleteUser = async (id: string) => {
  const response = await baseRequest("delete", "/admin/user/" + id);
  return response.status
    ? (response as PaginationResponse)
    : (response as ErrorResponse);
};

export const importUsers = async (file: FormData) => {
  const response = await baseRequest("post", "/admin/users/import", file);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};

export const exportUsers = async () => {
  const response = await baseRequest(
    "get",
    "/admin/users/export",
    {},
    { responseType: "blob" }
  );
  return response.status ? response : (response as ErrorResponse);
};

export const getUserById = async (id: string | number) => {
  const response = await baseRequest("get", "/admin/user/" + id);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};
export const updateUserById = async (
  id: string | number,
  data: EditUserForm
) => {
  const response = await baseRequest("put", "/admin/user/" + id, data);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};

export const createNewUser = async (data: FormData) => {
  const response = await baseRequest("post", "/admin/user/create", data);
  return response.status
    ? (response as SuccessResponse)
    : (response as ErrorResponse);
};
