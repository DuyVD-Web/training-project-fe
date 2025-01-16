import { useContext } from "react";
import { UserContext } from "../utils/contexts";
import { UserContextType } from "@/libs/types/types";

export function useUser() {
  return useContext(UserContext) as UserContextType;
}
