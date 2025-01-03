import { useEffect, useState, useCallback } from "react";
import { getHistory } from "../../libs/user/user";
import { AccessHistoryState, History } from "../../libs/types/user";
import { useToast } from "../../layouts/AppProvider";
import Table from "../common/Table";
import { ColumnProps } from "../../libs/types/types";
import DateSelects from "../common/DateSelects";

const AccessHistory = () => {
  const [currentParams, setParams] = useState<AccessHistoryState>({
    types: [],
    years: [],
    page: 1,
    asc: false,
  });
  const [histories, setHistories] = useState<History[]>([]);
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);

  const columns: ColumnProps[] = [
    {
      title: "Type",
      key: "type",
    },
    {
      title: "IP Address",
      key: "ipAddress",
    },
    {
      title: "Browser",
      key: "browser",
    },
    {
      title: "Platform",
      key: "platform",
    },
    {
      title: "Device",
      key: "device",
    },
    {
      title: "Time",
      key: "time",
      sort: {
        asc: currentParams?.asc,
        onClick: () => handleSort(),
      },
    },
  ];

  const parseSearchParams = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      types: searchParams.getAll("types[]"),
      year: searchParams.get("year") || undefined,
      month: searchParams.get("month") || undefined,
      day: searchParams.get("day") || undefined,
      asc: searchParams.get("sort") === "asc",
      page: parseInt(searchParams.get("page") || "1"),
      field: searchParams.get("field") || "time",
    };
  }, []);

  const updateURL = useCallback((params: Partial<AccessHistoryState>) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("types[]");
    params.types?.forEach((type) => {
      searchParams.append("types[]", type);
    });

    if (params.year) searchParams.set("year", params.year.toString());
    else searchParams.delete("year");

    if (params.month) searchParams.set("month", params.month.toString());
    else searchParams.delete("month");

    if (params.day) searchParams.set("day", params.day.toString());
    else searchParams.delete("day");

    searchParams.set("sort", params.asc ? "asc" : "desc");
    searchParams.set("page", (params.page || 1).toString());
    searchParams.set("field", "time");

    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newURL);

    setParams((currentParams) => ({
      ...currentParams!,
      types: params.types || currentParams?.types || [],
      year: params.year || currentParams?.year,
      month: params.month || currentParams?.month,
      day: params.day || currentParams?.day,
      asc: params.asc ?? currentParams?.asc ?? false,
      page: params.page || currentParams?.page || 1,
    }));

    fetchData(searchParams.toString());
  }, []);

  const fetchData = async (queryString: string) => {
    setLoading(true);
    try {
      const result = await getHistory(`?${queryString}`);

      if ("errors" in result) {
        showToast("Something went wrong", "error");
        return;
      }

      if ("data" in result) {
        setParams((currentParams) => {
          const newParams: AccessHistoryState = {
            ...currentParams!,
            years: result.data.years,
            lastPage: result.data.meta.lastPage,
            perPage: result.data.meta.perPage,
            total: result.data.meta.total,
            from: result.data.meta.from,
            to: result.data.meta.to,
          };
          return newParams;
        });
        setHistories(result.data.histories);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = parseSearchParams();
    updateURL(params);
  }, []);

  const onChangePage = (page: number) => {
    if (currentParams) {
      updateURL({ ...currentParams, page });
    }
  };

  const handleDateChange = (field: "year" | "month" | "day", value: string) => {
    if (!currentParams) return;

    setParams({
      ...currentParams,
      [field]: value || undefined,
      page: 1,
    });
  };

  const handleSearch = () => {
    if (currentParams) {
      updateURL(currentParams);
    }
  };

  const handleTypeFilter = (type: string, checked: boolean) => {
    if (!currentParams) return;

    const newTypes = checked
      ? [...currentParams.types, type]
      : currentParams.types.filter((t) => t !== type);

    updateURL({
      ...currentParams,
      types: newTypes,
      page: 1,
    });
  };

  const handleSort = () => {
    if (currentParams) {
      updateURL({
        ...currentParams,
        asc: !currentParams.asc,
      });
    }
  };

  return (
    <div className="grid grid-cols-12 text-gray-900 min-h-fit pr-4 col-start-1 col-end-5">
      <div className="col-start-3 col-end-13">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl">Access History</h1>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div className="flex gap-1 items-center w-[50%]">
            <DateSelects
              currentParams={{
                year: currentParams.year,
                month: currentParams.month,
                day: currentParams.day,
              }}
              onDateChange={handleDateChange}
            />

            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="flex items-center border-2 border-gray-500 bg-white w-fit ml-4 p-4 shadow-md">
            <input
              id="login"
              type="checkbox"
              value="login"
              checked={currentParams?.types.includes("login")}
              onChange={(e) => handleTypeFilter("login", e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="login"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Login
            </label>

            <input
              id="logout"
              type="checkbox"
              value="logout"
              checked={currentParams?.types.includes("logout")}
              onChange={(e) => handleTypeFilter("logout", e.target.checked)}
              className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="logout"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Logout
            </label>
          </div>
        </div>

        <div className="px-3 py-4 flex flex-col justify-between h-3/4">
          {currentParams && (
            <Table
              columns={columns}
              pagination={{
                data: histories,
                currentPage: currentParams.page,
                lastPage: currentParams.lastPage,
                total: currentParams.total,
                from: currentParams.from,
                to: currentParams.to,
                onPageChange: onChangePage,
                isLoading: isLoading,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessHistory;
