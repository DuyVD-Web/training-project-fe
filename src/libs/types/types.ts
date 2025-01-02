import { AUTH_ACTIONS } from "../constants/auth.ts";
import { UserInfor } from "./user.ts";

export type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

export type ErrorResponse = {
  status: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  code?: number | string;
};
export type SuccessResponse = {
  status: boolean;
  data?: unknown;
};

export type ToastType = "success" | "error";

export type PaginationResponse = {
  status: boolean;
  data: {
    meta: {
      currentPage: number;
      lastPage: number;
      total: number;
      perPage: number;
      from: number;
      to: number;
      links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
    };
    sort?: string;
    field?: string;
    types?: string[];
    [key: string]: unknown;
  };
};

export type AuthState = {
  isLoggedIn: boolean;
};

export type LoginAction = {
  type: typeof AUTH_ACTIONS.LOGIN;
  payload: string;
};

export type LogoutAction = {
  type: typeof AUTH_ACTIONS.LOGOUT;
};

export type LoginFormInput = {
  email: string;
  password: string;
};

export type SignupFormInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOGIN; payload: string }
  | { type: typeof AUTH_ACTIONS.LOGOUT; payload?: string };

export type ToastState = {
  visible: boolean;
  message: string;
  type: ToastType;
};

export type ToastAction =
  | { type: "SHOW_TOAST"; payload: { message: string; type: ToastType } }
  | { type: "HIDE_TOAST" };

export type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export type UserContextType = {
  user: UserInfor | null;
  setUserInfo: (user: UserInfor | null) => void;
};

export type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
};
