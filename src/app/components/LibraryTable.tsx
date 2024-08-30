"use client";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { TableColumn, TableRow } from "../types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMUIColumns } from "../utils";
import { useMediaQuery } from "@mui/material";

export interface ILibraryTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const LibraryTable = ({ columns, rows }: ILibraryTableProps): JSX.Element => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const darkMode = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkMode}>
      <div className="w-full">
        <div className="flex flex-row flex-wrap gap-2 text-white p-4">
          <a href="/pure-table" className="text-md text-blue-400">
            Pure Table
          </a>
          |<div className="text-md font-bold">Library Table</div>
        </div>
        <DataGrid
          rows={rows}
          columns={getMUIColumns(columns, isMobile)}
          rowHeight={64}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          getCellClassName={(params) => {
            return params.field !== "url" ? "bigfont-cell" : "";
          }}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              background: "#334155",
            },
            "& .MuiDataGrid-row:hover": {
              background: "#475569",
            },
            "& .bigfont-cell": {
              fontSize: "1rem",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
          disableRowSelectionOnClick
          disableColumnResize
        />
      </div>
    </ThemeProvider>
  );
};

export default LibraryTable;
