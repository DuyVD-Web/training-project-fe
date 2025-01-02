import { useEffect, useState } from "react";
import { getHistory } from "../../libs/user/user";
import { AccessHistoryState, History } from "../../libs/types/user";
import PaginationLink from "../PaginationLink";
import { useToast } from "../../layouts/AppProvider";

const AccessHistory = () => {
  const [currentParams, setParams] = useState<AccessHistoryState>();
  const [currentQuery, setQuery] = useState<string>("");
  const [histories, setHistories] = useState<History[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const getAccessHistory = async () => {
      const result = await getHistory(currentQuery);
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
          sort: result.data.sort,
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
    };
    getAccessHistory();
  }, [currentQuery]);

  const updateQuery = (params: AccessHistoryState) => {
    const query: string[] = [];

    params.types.forEach((type) => {
      query.push(`types%5B%5D=${type}`);
    });

    if (params.year) query.push(`year=${params.year}`);
    if (params.month) query.push(`month=${params.month}`);
    if (params.day) query.push(`day=${params.day}`);
    if (params.sort) query.push(`sort=${params.sort}`);
    if (params.page) query.push(`page=${params.page}`);

    query.push("field=time");

    setQuery(`?${query.join("&")}`);
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
        sort: currentParams.sort === "asc" ? "desc" : currentParams.sort,
      };
      setParams({
        ...currentParams,
        sort: currentParams.sort === "asc" ? "desc" : "asc",
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
          <table className="w-full text-md bg-white shadow-md rounded mb-4 border-t-2">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-5">
                  <div className="inline-block">Type</div>
                </th>
                <th className="text-left p-3 px-5">
                  <div className="inline-block">IP Address</div>
                </th>
                <th className="text-left p-3 px-5">Browser</th>
                <th className="text-left p-3 px-5">Platform</th>
                <th className="text-left p-3 px-5">Device</th>
                <th className="text-left p-3 px-5">
                  <div className="inline-block">Time</div>
                  <button
                    onClick={() => handleSort()}
                    className="sort-btn"
                    data-order={currentParams?.sort}
                  >
                    <svg
                      className={`w-3 h-3 text-gray-800
                         dark:text-white inline transition-transform duration-300 ${
                           currentParams?.sort === "desc" ? "rotate-180" : ""
                         }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 8"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                      />
                    </svg>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {histories.map((history, index) => (
                <tr key={index} className="border-b bg-gray-100">
                  <td className="p-3 px-5">{history.type}</td>
                  <td className="p-3 px-5">{history.ip_address}</td>
                  <td className="p-3 px-5">{history.browser}</td>
                  <td className="p-3 px-5">{history.platform}</td>
                  <td className="p-3 px-5">{history.device}</td>
                  <td className="p-3 px-5">{history.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentParams ? (
            <PaginationLink
              currentPage={currentParams.page}
              lastPage={currentParams.lastPage}
              total={currentParams.total}
              from={currentParams.from}
              to={currentParams.to}
              onPageChange={function (page: number): void {
                const newParams = {
                  ...currentParams,
                  page: page,
                };
                setParams({
                  ...currentParams,
                  page: page,
                });
                updateQuery(newParams);
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessHistory;
