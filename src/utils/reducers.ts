import {
  AuthState,
  AuthAction,
  ToastState,
  ToastAction,
} from "@/libs/types/types";
import { AUTH_ACTIONS } from "@/libs/constants/auth";
import { setCookie, removeCookie } from "@/utils/Cookie";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      setCookie("authToken", action.payload, { path: "/" });
      return { isLoggedIn: true };
    case AUTH_ACTIONS.LOGOUT:
      if (action.payload) {
        removeCookie("authToken");
      }
      return { isLoggedIn: false };
    default:
      return state;
  }
};

export const toastReducer = (
  state: ToastState,
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        visible: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case "HIDE_TOAST":
      return {
        visible: false,
        message: "",
        type: "success",
      };
    default:
      return state;
  }
};
