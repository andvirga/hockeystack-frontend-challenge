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
  return apiDataRows.map((row) => ({
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
          className="text-blue-600 visited:text-purple-600"
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
