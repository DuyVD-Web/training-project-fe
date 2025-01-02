import { useEffect, useState } from "react";
import { getHistory } from "../../libs/user/user";
import { AccessHistoryState, History } from "../../libs/types/user";
import { useToast } from "../../layouts/AppProvider";
import Table from "../Table";
import { ColumnProps } from "../../libs/types/types";
import ReactLoading from "react-loading";

const AccessHistory = () => {
  const [currentParams, setParams] = useState<AccessHistoryState>();
  const [currentQuery, setQuery] = useState<string>("");
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

  const getParams = () => {
    const current = new URLSearchParams(window.location.search);
    return "?" + current.toString();
  };

  useEffect(() => {
    const getAccessHistory = async () => {
      setLoading(true);

      const result = await getHistory(getParams());
      if ("errors" in result) {
        showToast("Something went wrong", "error");
      }

      if ("data" in result) {
        setParams({
          ...currentParams,
          types: result.data.types ? result.data.types : [],
          year: result.data.currentYear,
          month: result.data.currentMonth,
          day: result.data.currentDay,
          asc: result.data.sort === "asc" ? true : false,
          page: result.data.meta.currentPage,
          years: result.data.years,
          lastPage: result.data.meta.lastPage,
          perPage: result.data.meta.perPage,
          total: result.data.meta.total,
          from: result.data.meta.from,
          to: result.data.meta.to,
        });
        setHistories(result.data.histories);
      }
      setLoading(false);
    };
    getAccessHistory();
  }, [currentQuery]);

  const onChangePage = (page: number) => {
    if (currentParams) {
      const newParams = {
        ...currentParams,
        page: page,
      };
      setParams({
        ...currentParams,
        page: page,
      });
      updateQuery(newParams);
    }
  };

  const updateQuery = (params: AccessHistoryState) => {
    const query: string[] = [];

    params.types.forEach((type) => {
      query.push(`types%5B%5D=${type}`);
    });

    if (params.year) query.push(`year=${params.year}`);
    if (params.month) query.push(`month=${params.month}`);
    if (params.day) query.push(`day=${params.day}`);
    if (params.asc) query.push(`sort=${params.asc ? "asc" : "desc"}`);
    if (params.page) query.push(`page=${params.page}`);

    query.push("field=time");

    const newQuery = `?${query.join("&")}`;
    window.history.pushState({}, "", newQuery);
    setQuery(newQuery);
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
      updateQuery(currentParams);
    }
  };

  const handleTypeFilter = (type: string, checked: boolean) => {
    if (!currentParams) return;

    let newTypes = [...currentParams.types];

    if (checked) {
      if (!newTypes.includes(type)) {
        newTypes.push(type);
      }
    } else {
      newTypes = newTypes.filter((t) => t !== type);
    }

    const newParams = {
      ...currentParams,
      types: newTypes,
      page: 1,
    };

    setParams({
      ...currentParams,
      types: newTypes,
    });
    updateQuery(newParams);
  };

  const handleSort = () => {
    if (currentParams) {
      const newParams = {
        ...currentParams,
        asc: !currentParams.asc,
      };
      setParams({
        ...currentParams,
        asc: !currentParams.asc,
      });
      updateQuery(newParams);
    }
  };

  return (
    <div className="grid grid-cols-12 text-gray-900 min-h-fit pr-4 col-start-1 col-end-5">
      <div className="col-start-3 col-end-13">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl">Access History</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-items-center align-middle w-full h-full">
            <ReactLoading
              type={"spin"}
              color={"#3b82f6"}
              height={50}
              width={50}
            />
          </div>
        ) : (
          <>
            <div className="p-4 flex justify-between items-center">
              <div className="flex gap-1 items-center w-[50%]">
                <select
                  name="year"
                  id="year"
                  className="w-[30%] border-2 border-gray-400 rounded py-1"
                  value={currentParams?.year || ""}
                  onChange={(e) => handleDateChange("year", e.target.value)}
                >
                  <option value=""></option>
                  {currentParams
                    ? currentParams.years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          selected={currentParams.year === year}
                        >
                          {year}
                        </option>
                      ))
                    : ""}
                </select>

                <select
                  name="month"
                  id="month"
                  className="w-[20%] border-2 border-gray-400 rounded py-1"
                  value={currentParams?.month || ""}
                  onChange={(e) => handleDateChange("month", e.target.value)}
                >
                  <option value=""></option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option
                      key={month}
                      value={month}
                      selected={currentParams?.month === month.toString()}
                    >
                      {new Date(2024, month - 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>

                <select
                  name="day"
                  id="day"
                  className="w-[10%] border-2 border-gray-400 rounded py-1"
                  value={currentParams?.day || ""}
                  onChange={(e) => handleDateChange("day", e.target.value)}
                >
                  <option value=""></option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option
                      key={day}
                      value={day}
                      selected={currentParams?.day === day.toString()}
                    >
                      {day}
                    </option>
                  ))}
                </select>

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
              {currentParams ? (
                <Table
                  columns={columns}
                  pagination={{
                    data: histories,
                    currentPage: currentParams?.page,
                    lastPage: currentParams?.lastPage,
                    total: currentParams?.total,
                    from: currentParams?.from,
                    to: currentParams?.to,
                    onPageChange: onChangePage,
                  }}
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccessHistory;
