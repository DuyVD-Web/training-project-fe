import { useEffect, useState } from "react";
import { getPermissions, patchPermissions } from "@/libs/user/permissions";
import { RolePermissionForm, RolePermissionType } from "@/libs/types/admin";
import { useToast } from "@/hooks/useToast";
import { usePermissions } from "@/hooks/usePermissons";
import { UPDATE_PERMISSION } from "@/libs/constants/permissions";

const PermissionsManage = () => {
  const [rolePermissions, setRolePermission] = useState<RolePermissionType[]>(
    []
  );
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: string[];
  }>({});
  const { showToast } = useToast();
  const { permissions } = usePermissions();

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await getPermissions();

      if ("errors" in response) {
        showToast(response.message || "Something went wrong.", "error");
        return;
      }
      setRolePermission(response.data.roles);

      const initialSelectedPermissions: { [key: string]: string[] } = {};
      response.data.roles.forEach((role: RolePermissionType) => {
        initialSelectedPermissions[role.id] = role.permissions.map((p) => p.id);
      });
      setSelectedPermissions(initialSelectedPermissions);
    };
    fetchPermissions();
  }, []);

  const handleCheckboxChange = (
    roleId: string,
    permissionId: string,
    checked: boolean
  ) => {
    if (permissions.includes(UPDATE_PERMISSION)) {
      setSelectedPermissions((prev) => {
        const rolePermissions = prev[roleId] || [];
        return {
          ...prev,
          [roleId]: checked
            ? [...rolePermissions, permissionId]
            : rolePermissions.filter((id) => id !== permissionId),
        };
      });
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    roleId: string
  ) => {
    event.preventDefault();
    const permissions = selectedPermissions[roleId] || [];

    const formattedData = {
      role_id: roleId,
      permissions: permissions.reduce((acc, permId, index) => {
        acc[index.toString()] = permId;
        return acc;
      }, {} as { [key: string]: string }),
    } as RolePermissionForm;

    const response = await patchPermissions(formattedData);
    if ("errors" in response) {
      showToast(response.message || "Something went wrong.", "error");
      return;
    }

    showToast("Update permissions successfully.");
  };

  return (
    <>
      <div className="col-start-1 col-end-5 gap-6 py-10">
        <h1 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
          Permission manage
        </h1>
        <div className="flex gap-14 flex-wrap">
          {rolePermissions.map((rolePermission, roleIndex) => (
            <div
              className="bg-white shadow-md rounded-lg mb-4 overflow-hidden w-2/5 h-fit"
              key={"role-" + roleIndex}
            >
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700">
                  {(rolePermission.name + " Role Permissions").replace(
                    /^\w/,
                    (c) => c.toUpperCase()
                  )}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={(e) => handleSubmit(e, rolePermission.id)}>
                  <div className="flex flex-col gap-2">
                    {rolePermission.allPermissions.map((permission, index) => (
                      <div className="flex items-center" key={"per-" + index}>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          id={`${rolePermission.id}-${permission.id}`}
                          checked={
                            selectedPermissions[rolePermission.id]?.includes(
                              permission.id
                            ) || false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              rolePermission.id,
                              permission.id,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          htmlFor={`${rolePermission.id}-${permission.id}`}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {permission.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  {permissions.includes(UPDATE_PERMISSION) ? (
                    <button
                      type="submit"
                      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update Permissions
                    </button>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PermissionsManage;
