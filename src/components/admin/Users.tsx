import { useCallback, useEffect, useState } from "react";
import {
  deleteUser,
  exportUsers,
  getUsers,
  importUsers,
} from "@/libs/user/user";
import { UsersParamsType, UsersType } from "@/libs/types/admin";
import Table from "@/components/common/Table";
import { ColumnProps } from "@/libs/types/types";
import Filters from "@/components/common/Filters";
import SearchIcon from "@/components/icon/SearchIcon";
import FileUploadForm from "@/components/common/FileUploadForm";
import { useNavigate } from "react-router";
import { DEFAULT_PAGINATION } from "@/libs/constants/common";
import { useToast } from "@/hooks/useToast";
import { usePermissions } from "@/hooks/usePermissons";
import {
  CREATE_USER,
  DELETE_USER,
  EXPORT_USERS,
  IMPORT_USERS,
  UPDATE_USER,
} from "@/libs/constants/permissions";

const Users = () => {
  const { permissions } = usePermissions();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [currentParams, setCurrentParams] = useState<UsersParamsType | null>({
    types: [],
    page: 1,
    asc: true,
    pageSize: DEFAULT_PAGINATION,
    field: "name",
    lastPage: 1,
    total: 1,
    from: 1,
    to: 1,
    verified: false,
  });
  const [users, setUsers] = useState<UsersType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const parseSearchParams = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      types: searchParams.getAll("roles[]"),
      asc: searchParams.get("sort") !== "desc",
      page: parseInt(searchParams.get("page") || "1"),
      field: searchParams.get("field") || "name",
      pageSize: searchParams.get("pageSize"),
      verified: searchParams.get("verified") ? true : false,
      search: searchParams.get("search"),
    } as unknown as Partial<UsersParamsType>;
  }, []);

  const deleteUserApi = async (id: number) => {
    const result = await deleteUser(id.toString());
    if ("errors" in result) {
      showToast(result.message || "Something went wrong.", "error");
      return;
    }
    if (result.status) {
      showToast("Delete successful.");
      setUsers((prev) => {
        return prev.filter((user) => user.id != id.toString());
      });
    }
    setShowConfirmDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUserApi(userToDelete);
    }
  };

  const handleEditUser = (id: number) => {
    navigate("/admin/user/" + id);
  };

  const updateURL = useCallback((params: Partial<UsersParamsType>) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("roles[]");
    params.types?.forEach((type) => {
      searchParams.append("roles[]", type);
    });

    searchParams.set("pageSize", (params.pageSize || 5).toString());

    searchParams.delete("verified");
    if (params.verified) {
      searchParams.set("verified", "1");
    }

    searchParams.delete("search");
    if (params.search) {
      searchParams.set("search", params.search);
    }

    searchParams.set("sort", params.asc ? "asc" : "desc");
    searchParams.set("page", (params.page || 1).toString());
    searchParams.set("field", params.field ? params.field : "name");

    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newURL);

    setCurrentParams((currentParams) => ({
      ...currentParams!,
      types: params.types || currentParams?.types || [],
      field: params.field || currentParams?.field || "name",
      asc: params.asc ?? currentParams?.asc ?? false,
      page: params.page || currentParams?.page || 1,
      pageSize: params.pageSize || currentParams?.pageSize || 5,
      search: params.search || "",
      verified: params.verified || false,
    }));

    fetchData(searchParams.toString());
  }, []);

  useEffect(() => {
    const params = parseSearchParams();
    console.log(params);
    updateURL(params);
  }, []);

  const actionButtons = [
    {
      title: "Delete",
      permission: DELETE_USER,
      onClick: handleDeleteClick,
      class:
        "text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline",
    },
    {
      title: "Edit",
      permission: UPDATE_USER,
      onClick: handleEditUser,
      class:
        "text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline",
    },
  ];

  const columns: ColumnProps[] = [
    {
      title: "Name",
      key: "name",
      sort: {
        asc:
          currentParams?.asc && currentParams.field === "name" ? true : false,
        onClick: () => handleSort("name"),
      },
    },
    {
      title: "Email",
      key: "email",
      sort: {
        asc:
          currentParams?.asc && currentParams.field === "email" ? true : false,
        onClick: () => handleSort("email"),
      },
    },
    {
      title: "Role",
      key: "role",
    },
    {
      title: "Verified at",
      key: "verifiedAt",
      sort: {
        asc:
          currentParams?.asc && currentParams.field === "verifiedAt"
            ? true
            : false,
        onClick: () => handleSort("verifiedAt"),
      },
    },
    {
      title: "Phone number",
      key: "phoneNumber",
    },
    {
      title: "Address",
      key: "address",
    },
    {
      title: "Actions",
      key: "action",
      buttons: actionButtons
        .filter((button) => permissions.includes(button.permission))
        .map(({ ...button }) => button),
    },
  ];

  const fetchData = async (queryString: string) => {
    setLoading(true);
    try {
      const result = await getUsers(`?${queryString}`);

      if ("errors" in result) {
        showToast("Something went wrong", "error");
        return;
      }
      if ("data" in result) {
        setCurrentParams((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            lastPage: result.data.meta.lastPage,
            perPage: result.data.meta.perPage,
            total: result.data.meta.total,
            from: result.data.meta.from,
            to: result.data.meta.to,
            pageSize: result.data.meta.perPage,
          };
        });
        setUsers(result.data.users);
      }
    } finally {
      setLoading(false);
    }
  };

  const onChangePage = (page: number) => {
    if (currentParams) {
      updateURL({ ...currentParams, page });
    }
  };

  const onChangePageSize = (pageSize: number) => {
    if (currentParams) {
      updateURL({ ...currentParams, pageSize });
    }
  };

  const handleTypeFilter = (type: string, checked: boolean) => {
    if (!currentParams) return;
    if (type === "verified") {
      updateURL({
        ...currentParams,
        verified: checked,
        page: 1,
      });
      console.log(currentParams);
      return;
    }

    const newTypes = checked
      ? [...currentParams.types, type]
      : currentParams.types.filter((t) => t !== type);

    updateURL({
      ...currentParams,
      types: newTypes,
      page: 1,
    });
  };

  const handleSort = (field: string) => {
    if (currentParams) {
      if (currentParams.field !== field) {
        updateURL({
          ...currentParams,
          field: field,
          asc: true,
        });
      } else {
        updateURL({
          ...currentParams,
          field: field,
          asc: !currentParams.asc,
        });
      }
    }
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentParams((prev: UsersParamsType | null) => {
      if (!prev) {
        return null;
      }
      return { ...prev, search: e.target.value };
    });
  };

  const importFile = async (file: FormData) => {
    const result = await importUsers(file);
    if ("errors" in result) {
      showToast(result.message || "Something went wrong.", "error");
      return;
    }

    if (result.status) {
      showToast(
        "Importing users. Please go to Import's status to check result."
      );
    }
  };

  const downloadExcelFile = async () => {
    const response = await exportUsers();

    if ("errors" in response) {
      const errorMessage = response.message || "Something went wrong.";
      showToast(errorMessage, "error");
      return;
    }

    const filename = `user_list_${new Date().toISOString().slice(0, 10)}.xlsx`;

    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-12 text-gray-900 min-h-fit pr-4 col-start-1 col-end-5">
      <div className="col-start-1 col-end-13">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl">Users</h1>
        </div>
        <div className="p-4 flex justify-between items-center">
          {permissions.includes(EXPORT_USERS) ? (
            <button
              className="mt-4 py-2 bg-blue-700 rounded px-2 text-white"
              onClick={downloadExcelFile}
            >
              Export Users
            </button>
          ) : (
            ""
          )}
          {permissions.includes(IMPORT_USERS) ? (
            <FileUploadForm apiCall={importFile} />
          ) : (
            ""
          )}
        </div>
        <div className="p-4 flex justify-between items-center">
          <Filters
            filters={[
              {
                name: "User",
                value: "user",
                checked: currentParams?.types.includes("user") || false,
              },
              {
                name: "Manager",
                value: "manager",
                checked: currentParams?.types.includes("manager") || false,
              },
              {
                name: "Admin",
                value: "admin",
                checked: currentParams?.types.includes("admin") || false,
              },
              {
                name: "Verified",
                value: "verified",
                checked: currentParams?.verified
                  ? currentParams?.verified
                  : false,
              },
            ]}
            onChange={handleTypeFilter}
          />

          <div className="w-[400px]">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="search"
                name="search_query"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search users..."
                onChange={onChangeSearchInput}
                value={currentParams?.search}
              />
              <button
                onClick={() => {
                  if (currentParams) updateURL(currentParams);
                }}
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>

          {permissions.includes(CREATE_USER) ? (
            <button
              className="rounded bg-blue-700 text-center text-white px-3 h-full py-2"
              onClick={() => {
                navigate("/admin/user");
              }}
            >
              New user
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="px-3 py-4 flex flex-col justify-between h-3/4">
          {currentParams && (
            <Table
              columns={columns}
              pagination={{
                data: users,
                currentPage: currentParams.page,
                lastPage: currentParams.lastPage,
                total: currentParams.total,
                from: currentParams.from,
                to: currentParams.to,
                onPageChange: onChangePage,
                isLoading: isLoading,
                pageSize: currentParams.pageSize,
                onPageSizeChange: onChangePageSize,
              }}
            />
          )}
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
