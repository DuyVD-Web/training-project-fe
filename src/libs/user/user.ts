import baseRequest from "../axios.ts";
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
  UserInfor,
} from "../types/user.ts";

export const getUser = async () => {
  const response = await baseRequest("get", "/user");
  return response.data.user as UserInfor;
};

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
