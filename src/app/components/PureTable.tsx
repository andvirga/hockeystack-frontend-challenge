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
import { formatCell, getSortDirection, renderSortIcon } from "../utils";
import { usePaginatedRows } from "../hooks/usePaginatedRows";
import { useSortedRows } from "../hooks/useSortedRows";

export interface IPureTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const PureTable = ({ columns, rows }: IPureTableProps): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [goToPage, setGoToPage] = useState<number>(1);
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
      setGoToPage(Number(e.target.value));
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
    <div>
      <div className="flex flex-row justify-end pb-4">
        <div id="paginator" className="flex flex-row gap-2">
          <button onClick={handleDecreasePage} disabled={page === 1}>
            &lt;
          </button>
          <div>
            <b>{page}</b>
          </div>
          <button onClick={handleIncreasePage} disabled={page === 50}>
            &gt;
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleColumnSort(col)}>
                {col.label}
                {sortBy.column === col && renderSortIcon(sortBy.direction)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, idRow) => {
            return (
              <tr key={`row_${idRow}`}>
                {columns.map((col, idCol) => {
                  return (
                    <td key={`cell_${idRow}_${idCol}`}>
                      {formatCell(col, row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row justify-end pt-4">
        <div id="gotopage" className="flex flex-row gap-1">
          <p>Go to page: </p>
          <input
            type="number"
            onChange={handleGoToPageChange}
            min={1}
            max={50}
            maxLength={2}
          />
          <button onClick={handleGoToPage}>Go!</button>
        </div>
      </div>
    </div>
  );
};

export default PureTable;
