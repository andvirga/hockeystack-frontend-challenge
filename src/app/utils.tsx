import { GridColDef } from "@mui/x-data-grid";
import {
  DataRow,
  SortColumn,
  SortDirection,
  TableColumn,
  TableRow,
} from "./types";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Ensure that seconds are always two digits
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
};

export const formatTableRows = (apiDataRows: DataRow[]): TableRow[] => {
  return apiDataRows.map((row, index) => ({
    id: `table_row_${index}`,
    url: row.url,
    scroll: row.avgScrollPercentage,
    time: row.totalPageviewCount,
    bounce: Math.ceil((row.bounceCount * 100) / row.totalCount),
    enters: row.startsWithCount,
    exits: row.endsWithCount,
    pageViews: row.totalCount,
    visitors: row.totalVisitorCount,
  }));
};

export const renderCell = (col: TableColumn, row: TableRow): JSX.Element => {
  switch (col.type) {
    case "percentage":
      return <span>{row[col.key]}%</span>;
    case "time":
      return <span>{formatTime(row["time"])}</span>;
    case "url":
      return (
        <a
          className="text-blue-400 visited:text-purple-400"
          href={`http://${row["url"]}`}
          target="_blank"
        >
          {row["url"]}
        </a>
      );
    case "number":
    default:
      return <span>{row[col.key]}</span>;
  }
};

export const getSortDirection = ({
  targetColumn,
  currentColumn,
  direction,
}: {
  targetColumn: SortColumn;
  currentColumn: SortColumn;
  direction: SortDirection;
}) => {
  if (targetColumn !== currentColumn) return "desc";
  switch (direction) {
    case "none":
    default:
      return "desc";
    case "desc":
      return "asc";
    case "asc":
      return "none";
  }
};

export const renderSortIcon = (direction: SortDirection) => {
  switch (direction) {
    case "none":
    default:
      return null;
    case "desc":
      return <span>&#9661;</span>;
    case "asc":
      return <span>&#9651;</span>;
  }
};

export const getMUIColumns = (columns: TableColumn[]) => {
  return columns.map((col, index) => {
    let column: GridColDef = {
      field: col.key,
      headerName: col.label.toLocaleUpperCase(),
      headerAlign: index !== 0 ? "center" : "left",
      align: index !== 0 ? "center" : "left",
      minWidth: 110,
      flex: 1,
      editable: false,
      sortable: true,
    };
    if (col.type === "url") {
      column = {
        ...column,
        minWidth: 400,
        renderCell: (params) => (
          <a
            href={`http://${params.value}`}
            target="_blank"
            className="text-blue-400 visited:text-purple-400"
          >
            {params.value}
          </a>
        ),
      };
    }
    if (col.type === "time") {
      column = {
        ...column,
        renderCell: (params) => formatTime(params.value),
      };
    }
    if (col.type === "percentage") {
      column = {
        ...column,
        renderCell: (params) => `${params.value}%`,
      };
    }
    return column;
  });
};
