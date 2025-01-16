import { useContext } from "react";
import { AuthContext } from "@/utils/contexts";
import { AuthContextType } from "@/libs/types/types";

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
