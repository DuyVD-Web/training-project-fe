import React, { useState } from "react";
import { PaginationProps } from "../../libs/types/types";
import GreaterThanIcon from "../icon/GreaterThanIcon";
import LessThanIcon from "../icon/LessThanIcon";

const PaginationLink = ({
  currentPage,
  lastPage,
  total,
  from,
  to,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) => {
  const [localPageSize, setLocalPageSize] = useState(pageSize);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    if (!isNaN(newSize) && newSize > 0) {
      setLocalPageSize(newSize);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing {from} to {to} of {total} results
      </div>

      <div className="flex items-center gap-1">
        {onPageSizeChange === undefined ? (
          ""
        ) : (
          <button
            className="bg-blue-500 text-white rounded px-2 py-1 disabled:opacity-50"
            onClick={() => onPageSizeChange(localPageSize)}
            disabled={localPageSize === pageSize}
          >
            Update
          </button>
        )}

        <div>
          <input
            id="pageSize"
            type="number"
            min="1"
            className={`w-20 text-lg border rounded-md px-3 py-1 ${
              onPageSizeChange === undefined
                ? "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                : ""
            }`}
            value={localPageSize}
            onChange={
              onPageSizeChange === undefined ? () => {} : handlePageSizeChange
            }
          />
        </div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`p-2 border rounded disabled:opacity-70 ${
            currentPage <= 1 ? "" : "hover:bg-gray-50"
          }`}
        >
          <LessThanIcon />
        </button>

        {Array.from({ length: lastPage }, (_, i) => i + 1)
          .filter(
            (page) =>
              Math.abs(page - currentPage) <= 1 ||
              page === 1 ||
              page === lastPage
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border rounded min-w-[32px] ${
                  currentPage === page
                    ? "bg-gray-50 border-blue-500 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= lastPage}
          className={`p-2 border rounded disabled:opacity-70 ${
            currentPage >= lastPage ? "" : "hover:bg-gray-50"
          }`}
        >
          <GreaterThanIcon />
        </button>
      </div>
    </div>
  );
};

export default PaginationLink;
