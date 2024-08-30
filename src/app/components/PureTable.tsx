"use client";
import React, { useCallback, useState } from "react";
import { SortBy, SortColumn, TableColumn, TableRow } from "../types";
import { NUMBER_ROWS_PER_PAGE, TOTAL_PAGES } from "../constants";
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
      if (pageTarget < 1 || pageTarget > TOTAL_PAGES) {
        setPageError(`Enter a page number between 1 and ${TOTAL_PAGES}`);
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
    <div className="w-full">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row flex-wrap gap-2 text-white">
          <div className="text-md font-bold">Pure Table</div>|
          <a href="/library-table" className="text-md text-blue-400">
            Library Table
          </a>
        </div>
        <div id="paginator" className="flex flex-row gap-1 text-md">
          <button
            className="px-2 py-1 rounded-md bg-slate-900 disabled:opacity-50 text-white"
            onClick={handleDecreasePage}
            disabled={page === 1}
          >
            &lt;
          </button>
          <div className="flex items-center text-white text-nowrap">
            <p>
              <b>{page}</b> / {TOTAL_PAGES}
            </p>
          </div>
          <button
            className="px-2 py-1 rounded-md bg-slate-900 disabled:opacity-50 text-white"
            onClick={handleIncreasePage}
            disabled={page === TOTAL_PAGES}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-600">
          <thead className="bg-slate-700">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  onClick={() => handleColumnSort(col)}
                  className={`text-sm text-white h-18 p-4 cursor-pointer uppercase border-b border-slate-600 max-w-xs ${
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
                <tr
                  key={`row_${idRow}`}
                  className="h-[64px] hover:bg-slate-600"
                >
                  {columns.map((col, idCol) => {
                    return (
                      <td
                        key={`cell_${idRow}_${idCol}`}
                        className={`text-white break-words border-b border-slate-600 px-4 max-w-xs h-[64px] ${
                          idCol !== 0
                            ? "text-center text-md"
                            : "text-left text-sm"
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
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row justify-end">
          <div id="gotopage" className="flex flex-row gap-2 items-center">
            <p className="text-white">Go to page:</p>
            <input
              className="w-16 px-2 py-1 border rounded-md text-center text-white bg-slate-800 border-slate-700"
              type="number"
              onChange={handleGoToPageChange}
              min={1}
              max={TOTAL_PAGES}
            />
            <button
              className="px-3 py-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={!!pageError}
              onClick={handleGoToPage}
            >
              OK
            </button>
          </div>
        </div>
        <div className="flex justify-end text-sm text-red-400">{pageError}</div>
      </div>
    </div>
  );
};

export default PureTable;
