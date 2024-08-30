import LibraryTable from "../components/LibraryTable";
import { TABLE_COLUMNS } from "../constants";
import { DataRow, TableRow } from "../types";
import { formatTableRows } from "../utils";

export default async function Home() {
  const apiData = await fetch(`http://localhost:${process.env.APP_PORT}/api`);
  const apiDataRows: DataRow[] = await apiData.json();
  const tableRows: TableRow[] = formatTableRows(apiDataRows);

  return (
    <div className="pb-4">
      <div className="bg-slate-600 text-white py-4">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl font-bold ">HockeyStack</h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <LibraryTable rows={tableRows} columns={TABLE_COLUMNS} />
      </div>
    </div>
  );
}
