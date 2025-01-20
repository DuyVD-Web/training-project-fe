import { useEffect, useState } from "react";
import { getStatus } from "@/libs/user/import";
import {
  ImportStatusType,
  ImportStatusState,
  ImportStatusReturn,
} from "@/libs/types/import";
import Table from "@/components/common/Table";
import { DEFAULT_PAGINATION } from "@/libs/constants/common";
import { useToast } from "@/hooks/useToast";
import { PaginationResponse } from "@/libs/types/types";

const ImportStatus = () => {
  const [currentState, setState] = useState<ImportStatusState>({
    page: 1,
    lastPage: 1,
    perPage: DEFAULT_PAGINATION,
    total: 0,
    from: 0,
    to: 0,
  });
  const [statuses, setStatuses] = useState<ImportStatusType[]>([]);
  const { showToast } = useToast();

  const parseSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      page: parseInt(searchParams.get("page") || "1"),
    } as unknown as Partial<ImportStatusState>;
  };

  const updateURL = (params: Partial<ImportStatusState>) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("page", (params.page || 1).toString());

    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newURL);

    setState((currentParams) => ({
      ...currentParams!,
      page: params.page || currentParams?.page || 1,
    }));

    fetchData(searchParams.toString());
  };

  const onChangePage = (page: number) => {
    if (currentState) {
      updateURL({ ...currentState, page });
    }
  };

  const fetchData = async (queryString: string) => {
    const response = await getStatus(queryString);
    if ("errors" in response) {
      showToast(response.message || "Something went wrong.", "error");
      return;
    }
    const successResponse = response as PaginationResponse<ImportStatusReturn>;
    setState((prev) => {
      const newState = {
        ...prev,
        page: successResponse.data.meta.currentPage,
        lastPage: successResponse.data.meta.lastPage,
        perPage: successResponse.data.meta.perPage,
        total: successResponse.data.meta.total,
        from: successResponse.data.meta.from,
        to: successResponse.data.meta.to,
      };
      return newState;
    });
    setStatuses(successResponse.data.importStatus);
  };

  useEffect(() => {
    const params = parseSearchParams();
    updateURL(params);

    const intervalId = setInterval(() => {
      const params = parseSearchParams();
      updateURL(params);
    }, 20000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="col-start-1 col-end-6 relative grid grid-cols-6">
      <div className="col-start-1 col-end-7 pr-20">
        <h2 className="mb-7 text-lg font-medium text-gray-900">Imports</h2>
        <Table
          columns={[
            {
              title: "Status",
              key: "status",
              renderFunction: (item) => {
                if (item === "pending")
                  return <span className="text-yellow-500">{item}</span>;
                if (item === "done")
                  return <span className="text-green-500">{item}</span>;
                return <span className="text-red-500">{item}</span>;
              },
            },
            {
              title: "Message",
              key: "message",
              renderFunction: (item) => (
                <div className="max-h-40 overflow-auto">
                  {item?.split("<br />")?.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </div>
              ),
            },
            {
              title: "Last updated at",
              key: "updated_at",
            },
            {
              title: "Created at",
              key: "created_at",
            },
          ]}
          pagination={{
            data: statuses,
            isLoading: false,
            currentPage: currentState.page,
            lastPage: currentState.lastPage,
            total: currentState.total,
            from: currentState.from,
            to: currentState.to,
            pageSize: currentState.perPage,
            onPageChange: onChangePage,
          }}
        />
      </div>
    </div>
  );
};

export default ImportStatus;
