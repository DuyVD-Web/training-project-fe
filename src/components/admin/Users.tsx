import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../libs/user/user";
import { useToast } from "../../layouts/AppProvider";
import { UsersParamsType, UsersType } from "../../libs/types/admin";
import Table from "../common/Table";
import { ColumnProps } from "../../libs/types/types";
import Filters from "../common/Filters";

const Users = () => {
  const { showToast } = useToast();
  const [currentParams, setCurrentParams] = useState<UsersParamsType | null>({
    types: [],
    page: 1,
    asc: true,
    pageSize: 5,
    field: "name",
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
      pageSize: searchParams.get("pageSize") || "5",
      verified: searchParams.get("verified"),
      search: searchParams.get("search"),
    } as unknown as Partial<UsersParamsType>;
  }, []);

  const updateURL = useCallback((params: Partial<UsersParamsType>) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("roles[]");
    params.types?.forEach((type) => {
      searchParams.append("roles[]", type);
    });

    searchParams.set("pageSize", (params.pageSize || 5).toString());

    searchParams.delete("verified");
    if (params.verified) {
      searchParams.set("verified", params.verified ? "1" : "0");
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
    }));

    fetchData(searchParams.toString());
  }, []);

  useEffect(() => {
    const params = parseSearchParams();
    updateURL(params);
  }, []);

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

  const onChangeSearchInput = (e) => {
    setCurrentParams((prev) => {
      if (prev) return { ...prev, search: e.target.value };
    });
  };

  return (
    <div className="grid grid-cols-12 text-gray-900 min-h-fit pr-4 col-start-1 col-end-5">
      <div className="col-start-3 col-end-13">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl">Users</h1>
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
                  ? currentParams.verified
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
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
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
        </div>

        {/* <div className="flex items-center border-2 border-gray-500 bg-white w-fit ml-4 p-4 shadow-md">
          <input
            id="user"
            type="checkbox"
            value="user"
            checked={currentParams?.types.includes("user")}
            onChange={(e) => handleTypeFilter("user", e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="user"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            User
          </label>

          <input
            id="manager"
            type="checkbox"
            value="manager"
            checked={currentParams?.types.includes("manager")}
            onChange={(e) => handleTypeFilter("manager", e.target.checked)}
            className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="manager"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Manager
          </label>
        </div> */}

        <div className="px-3 py-4 flex flex-col justify-between h-3/4">
          {currentParams && (
            <Table
              columns={columns}
              pagination={{
                data: users,
                currentPage: currentParams?.page,
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
    </div>
  );
};

export default Users;
