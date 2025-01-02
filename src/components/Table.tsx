import { TableProps } from "../libs/types/types";
import PaginationLink from "./PaginationLink";

const Table = <T extends Record<string, string>>(props: TableProps<T>) => {
  return (
    <>
      <table className="w-full text-md bg-white shadow-md rounded mb-4 border-t-2">
        <thead>
          <tr className="border-b">
            {props.columns.map((column) => (
              <th className="text-left p-3 px-5">
                <div className="inline-block">{column.title}</div>
                {column.sort ? (
                  <button
                    onClick={column.sort.onClick}
                    className="sort-btn"
                    data-order={column.sort.asc ? "asc" : "desc"}
                  >
                    <svg
                      className={`w-3 h-3 text-gray-800
                           dark:text-white inline transition-transform duration-300 
                           ${column.sort.asc ? "" : "rotate-180"}`}
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
                ) : (
                  ""
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.pagination.data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b bg-gray-100">
              {props.columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`} className="p-3 px-5">
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationLink
        currentPage={props.pagination.currentPage}
        lastPage={props.pagination.lastPage}
        total={props.pagination.total}
        from={props.pagination.from}
        to={props.pagination.to}
        onPageChange={props.pagination.onPageChange}
      />
    </>
  );
};

export default Table;
