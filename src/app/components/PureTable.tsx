import React from "react";
import { TableColumn, TableRow } from "../types";
import { TABLE_COLUMNS } from "../constants";
import { formatTime } from "../utils";

export interface IPureTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const formatCell = (col: TableColumn, row: TableRow): JSX.Element => {
  switch (col.type) {
    case "percentage":
      return <div>{row[col.key]}%</div>;
    case "time":
      return <div>{formatTime(row["time"])}</div>;
    case "url":
      return (
        <div>
          <a href={row["url"]} target="_blank">
            {row["url"]}
          </a>
        </div>
      );
    case "number":
    default:
      return <div>{row[col.key]}</div>;
  }
};

const PureTable = ({ columns, rows }: IPureTableProps): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idRow) => {
          return (
            <tr key={`row_${idRow}`}>
              {columns.map((col, idCol) => {
                return (
                  <td key={`cell_${idRow}_${idCol}`}>{formatCell(col, row)}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PureTable;
