export type UsersParamsType = {
  types: string[];
  page?: number;
  lastPage?: number;
  asc: boolean;
  pageSize: number;
  field: string;
  search?: string;
  verified?: boolean;
  total?: number;
  from?: number;
  to?: number;
};

export type UsersType = {
  id: string;
  name: string;
  email: string;
  role: string;
  verifiedAt: string;
  phoneNumber?: string;
  address?: string;
};

export type PermissionType = {
  id: string;
  name: string;
};

export type RolePermissionType = {
  id: string;
  name: string;
  allPermissions: PermissionType[];
  permissions: PermissionType[];
};

export type RolePermissionForm = {
  role_id: string;
  permissions: Record<string, string>;
};
