import { useContext } from "react";
import { PermissionsContext } from "@/utils/contexts";
import { PermissionsContextType } from "@/libs/types/types";

export function usePermissions() {
  return useContext(PermissionsContext) as PermissionsContextType;
}
