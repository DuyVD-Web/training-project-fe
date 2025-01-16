import { createContext } from "react";
import {
  AuthContextType,
  PermissionsContextType,
  ToastContextType,
  UserContextType,
} from "@/libs/types/types";

export const AuthContext = createContext<AuthContextType | null>(null);
export const ToastContext = createContext<ToastContextType | null>(null);
export const UserContext = createContext<UserContextType | null>(null);
export const PermissionsContext = createContext<PermissionsContextType | null>(
  null
);
