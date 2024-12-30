import baseRequest from "../axios.ts";
import { ErrorResponse, SuccessResponse } from "../types/types.ts";
import {
  ChangeAvatarResponse,
  ChangeEmailFormInput,
  ChangePasswordFormInput,
  EditInfoFormInput,
  UserInfor,
} from "../types/user.ts";

export const getUser = async () => {
  const response = await baseRequest("get", "/api/user");
  return response.data.user as UserInfor;
};

export const updateUserInfo = async (data: EditInfoFormInput) => {
  const response = await baseRequest("put", "/api/user", data);
  if (response.status) {
    return response.data.user as UserInfor;
  } else {
    return response as ErrorResponse;
  }
};

export const changePassword = async (data: ChangePasswordFormInput) => {
  const response = await baseRequest("put", "/api/user/password", data);
  if (response.status) {
    return response as SuccessResponse;
  } else {
    return response as ErrorResponse;
  }
};

export const changeEmail = async (data: ChangeEmailFormInput) => {
  const response = await baseRequest("post", "/api/user/email", data);
  if (response.status) {
    return response as SuccessResponse;
  } else {
    return response as ErrorResponse;
  }
};

export const updateAvatar = async (data: FormData) => {
  const response = await baseRequest("post", "/api/user/avatar", data);
  if (response.status) {
    return response as ChangeAvatarResponse;
  } else {
    return response as ErrorResponse;
  }
};
