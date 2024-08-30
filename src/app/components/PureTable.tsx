"use client";
import React, { useCallback, useState } from "react";
import {
  SortBy,
  SortColumn,
  SortDirection,
  TableColumn,
  TableRow,
} from "../types";
import { NUMBER_ROWS_PER_PAGE } from "../constants";
import { renderCell, getSortDirection, renderSortIcon } from "../utils";
import { usePaginatedRows } from "../hooks/usePaginatedRows";
import { useSortedRows } from "../hooks/useSortedRows";

export interface IPureTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const PureTable = ({ columns, rows }: IPureTableProps): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [goToPage, setGoToPage] = useState<number>(1);
  const [pageError, setPageError] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>({
    column: "none",
    direction: "none",
  });

  const handleIncreasePage = useCallback(() => {
    setPage((prevState) => prevState + 1);
  }, []);

  const handleDecreasePage = useCallback(() => {
    setPage((prevState) => prevState - 1);
  }, []);

  const handleGoToPageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pageTarget = Number(e.target.value);
      if (pageTarget < 1 || pageTarget > 50) {
        setPageError("Enter a page number between 1 and 50");
      } else {
        setPageError("");
        setGoToPage(pageTarget);
      }
    },
    []
  );

  const handleGoToPage = useCallback(() => {
    setPage(goToPage);
  }, [goToPage]);

  const handleColumnSort = useCallback(
    (targetColumn: SortColumn) => {
      setSortBy({
        column: targetColumn,
        direction: getSortDirection({
          targetColumn,
          currentColumn: sortBy.column,
          direction: sortBy.direction,
        }),
      });
    },
    [sortBy]
  );

  const sortedRows = useSortedRows({
    rows,
    sortBy,
  });

  const paginatedRows = usePaginatedRows({
    rows: sortedRows,
    page,
    pageSize: NUMBER_ROWS_PER_PAGE,
  });

  return (
    <div className="bg-white w-full">
      <div className="flex flex-row align-center justify-between pb-4">
        <div className="text-md">
          <b>Pure HTML Table</b>
        </div>
        <div id="paginator" className="flex flex-row gap-2 text-xl">
          <button
            className="px-2 py-1 rounded-md bg-white disabled:opacity-30"
            onClick={handleDecreasePage}
            disabled={page === 1}
          >
            &lt;
          </button>
          <div className="flex items-center">
            <b>{page}</b>
          </div>
          <button
            className="px-2 py-1 rounded-md bg-white disabled:opacity-30"
            onClick={handleIncreasePage}
            disabled={page === 50}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  onClick={() => handleColumnSort(col)}
                  className={`text-sm h-18 p-4 cursor-pointer uppercase border-b border-gray-200 max-w-xs ${
                    index !== 0 ? "text-center" : "text-left"
                  }`}
                >
                  <span>{col.label}</span>
                  {sortBy.column === col && renderSortIcon(sortBy.direction)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, idRow) => {
              return (
                <tr key={`row_${idRow}`} className={`hover:bg-gray-100`}>
                  {columns.map((col, idCol) => {
                    return (
                      <td
                        key={`cell_${idRow}_${idCol}`}
                        className={`text-sm break-words border-b border-gray-200 p-4 max-w-xs ${
                          idCol !== 0 ? "text-center" : "text-left"
                        }`}
                      >
                        {renderCell(col, row)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-end pt-4">
          <div id="gotopage" className="flex flex-row gap-2 items-center">
            <p>Go to page:</p>
            <input
              className="w-16 px-2 py-1 border rounded-md text-center"
              type="number"
              onChange={handleGoToPageChange}
              min={1}
              max={50}
            />
            <button
              className="px-3 py-1 border rounded-md bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-30"
              disabled={!!pageError}
              onClick={handleGoToPage}
            >
              Go!
            </button>
          </div>
        </div>
        <div className="flex justify-end text-sm text-red-500">{pageError}</div>
      </div>
    </div>
  );
};

export default PureTable;
