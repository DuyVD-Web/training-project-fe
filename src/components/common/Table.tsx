import { TableProps } from "../../libs/types/types";
import RotateArrowIcon from "../icon/RotateArrowIcon";
import PaginationLink from "./PaginationLink";
import ReactLoading from "react-loading";

const Table = <T extends Record<string, string>>(props: TableProps<T>) => {
  const renderRows = () => {
    if (props.pagination.data.length === 0) {
      return (
        <tr>
          <td
            colSpan={props.columns.length}
            className="text-center p-5 text-gray-500"
          >
            No data found
          </td>
        </tr>
      );
    }

    return props.pagination.data.map((item, rowIndex) => (
      <tr key={rowIndex} className="border-b bg-gray-100">
        {props.columns.map((column, colIndex) => {
          if (column.buttons)
            return (
              <td
                key={`${rowIndex}-${colIndex}`}
                className="p-3 px-5 flex justify-end gap-3"
              >
                {column.buttons.map((button) => (
                  <button className={button.class} onClick={button.onClick}>
                    {button.title}
                  </button>
                ))}
              </td>
            );
          return (
            <td key={`${rowIndex}-${colIndex}`} className="p-3 px-5">
              {item[column.key]}
            </td>
          );
        })}
      </tr>
    ));
  };

  const renderHeads = () => {
    return props.columns.map((column, index) => (
      <th className="text-left p-3 px-5" key={`col-${index}`}>
        <div className="inline-block">{column.title}</div>
        {column.sort ? (
          <button
            onClick={column.sort.onClick}
            className="sort-btn"
            data-order={column.sort.asc ? "asc" : "desc"}
          >
            <RotateArrowIcon rotate={column.sort.asc} />
          </button>
        ) : (
          ""
        )}
      </th>
    ));
  };

  const renderPaginate = () => {
    return (
      <PaginationLink
        currentPage={props.pagination.currentPage}
        lastPage={props.pagination.lastPage}
        total={props.pagination.total}
        from={props.pagination.from}
        to={props.pagination.to}
        onPageChange={props.pagination.onPageChange}
        pageSize={props.pagination.pageSize}
        onPageSizeChange={props.pagination.onPageSizeChange}
      />
    );
  };

  return (
    <>
      <table className="w-full text-md bg-white shadow-md rounded mb-4 border-t-2">
        <thead>
          <tr className="border-b">{renderHeads()}</tr>
        </thead>
        {props.pagination.isLoading ? (
          <tbody>
            <tr>
              <td colSpan={props.columns.length} className="h-64">
                <div className="w-full h-full flex justify-center items-center">
                  <ReactLoading
                    type={"spin"}
                    color={"#3b82f6"}
                    height={50}
                    width={50}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>{renderRows()}</tbody>
        )}
      </table>
      {renderPaginate()}
    </>
  );
};

export default Table;
