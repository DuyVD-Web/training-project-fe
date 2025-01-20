export type UsersParamsType = {
  types: string[];
  page: number;
  lastPage: number;
  asc: boolean;
  pageSize: number;
  field: string;
  search?: string;
  verified: boolean;
  total: number;
  from: number;
  to: number;
};

export type UsersType = {
  id: string;
  name: string;
  email: string;
  role: string;
  verifiedAt: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
};

export type UserTypeReturn = { user: UsersType };

export type PermissionType = {
  id: string;
  name: string;
  apiRoute: string;
};

export type PermissionTypeReturn = {
  roles: RolePermissionType[];
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
