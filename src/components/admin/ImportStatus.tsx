import { useCallback, useEffect, useState } from "react";
import { getStatus } from "../../libs/user/import";
import { ImportStatusType, ImportStatusState } from "../../libs/types/import";
import { useToast } from "../../layouts/AppProvider";
import Table from "../common/Table";
import { DEFAULT_PAGINATION } from "../../libs/constants/common";

const ImportStatus = () => {
  const [currentState, setState] = useState<ImportStatusState>({
    page: 0,
    lastPage: 0,
    perPage: DEFAULT_PAGINATION,
    total: 0,
    from: 0,
    to: 0,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<ImportStatusType[]>([]);
  const { showToast } = useToast();

  const parseSearchParams = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      page: parseInt(searchParams.get("page") || "1"),
    } as unknown as Partial<ImportStatusState>;
  }, []);

  const updateURL = useCallback((params: Partial<ImportStatusState>) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("page", (params.page || 1).toString());

    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newURL);

    setState((currentParams) => ({
      ...currentParams!,
      page: params.page || currentParams?.page || 1,
    }));

    fetchData(searchParams.toString());
  }, []);

  const onChangePage = (page: number) => {
    if (currentState) {
      updateURL({ ...currentState, page });
    }
  };

  const fetchData = async (queryString: string) => {
    setLoading(true);
    const response = await getStatus(queryString);
    if ("errors" in response) {
      showToast(response.message || "Something went wrong.", "error");
      setLoading(false);
      return;
    }
    setState((prev) => {
      const newState = {
        ...prev,
        page: response.data.meta.currentPage,
        lastPage: response.data.meta.lastPage,
        perPage: response.data.meta.perPage,
        total: response.data.meta.total,
        from: response.data.meta.from,
        to: response.data.meta.to,
      };
      console.log(newState);
      return newState;
    });
    setStatuses(response.data.importStatus);
    setLoading(false);
  };

  useEffect(() => {
    const params = parseSearchParams();
    updateURL(params);
  }, []);

  return (
    <div className="col-start-1 col-end-6 relative grid grid-cols-6">
      <div className="col-start-2 col-end-7 pr-20">
        <h2 className="mb-7 text-lg font-medium text-gray-900">Imports</h2>
        <Table
          columns={[
            {
              title: "Status",
              key: "status",
            },
            {
              title: "Message",
              key: "message",
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
            isLoading: isLoading,
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
