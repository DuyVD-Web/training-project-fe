import Toast from "@/components/common/Toast";
import { AUTH_ACTIONS } from "@/libs/constants/auth";
import { ToastType } from "@/libs/types/types";
import { UserInfor } from "@/libs/types/user";
import {
  AuthContext,
  PermissionsContext,
  ToastContext,
  UserContext,
} from "@/utils/contexts";
import { getCookie } from "@/utils/Cookie";
import { authReducer, toastReducer } from "@/utils/reducers";
import { ReactNode, useReducer, useState } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, {
    isLoggedIn: Boolean(getCookie("authToken")),
  });
  const [user, setUser] = useState<UserInfor | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  const setUserInfo = (user: UserInfor | null) => {
    setUser(user);
  };
  const setUserPermssions = (permissions: string[]) => {
    setPermissions(permissions);
  };

  const [toastState, toastDispatch] = useReducer(toastReducer, {
    visible: false,
    message: "",
    type: "success",
  });

  const login = (token: string) => {
    authDispatch({ type: AUTH_ACTIONS.LOGIN, payload: token });
  };

  const logout = () => {
    authDispatch({ type: AUTH_ACTIONS.LOGOUT, payload: "" });
  };

  const showToast = (message: string, type: ToastType = "success") => {
    toastDispatch({
      type: "SHOW_TOAST",
      payload: { message, type },
    });
  };

  const hideToast = () => {
    toastDispatch({ type: "HIDE_TOAST" });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        login,
        logout,
      }}
    >
      <UserContext.Provider
        value={{
          user,
          setUserInfo,
        }}
      >
        <PermissionsContext.Provider
          value={{
            permissions,
            setUserPermssions,
          }}
        >
          <ToastContext.Provider
            value={{
              showToast,
              hideToast,
            }}
          >
            {toastState.visible && (
              <Toast
                message={toastState.message}
                type={toastState.type}
                onClose={hideToast}
              />
            )}
            {children}
          </ToastContext.Provider>
        </PermissionsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
