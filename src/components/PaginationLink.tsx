import React from "react";
import { PaginationProps } from "../libs/types/types";

const PaginationLink = ({
  currentPage,
  lastPage,
  total,
  from,
  to,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing {from} to {to} of {total} results
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`p-2 border rounded  disabled:opacity-70 ${
            currentPage <= 1 ? "" : "hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
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
          className={`p-2 border rounded  disabled:opacity-70 ${
            currentPage >= lastPage ? "" : "hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginationLink;
