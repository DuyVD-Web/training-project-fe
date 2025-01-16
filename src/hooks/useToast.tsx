import { useContext } from "react";
import { ToastContext } from "../utils/contexts";
import { ToastContextType } from "@/libs/types/types";

export function useToast() {
  return useContext(ToastContext) as ToastContextType;
}
