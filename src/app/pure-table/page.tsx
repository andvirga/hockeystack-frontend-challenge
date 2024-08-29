import PureTable from "../components/PureTable";
import { TABLE_COLUMNS } from "../constants";
import { TableRow, DataRow } from "../types";
import { formatTableRows } from "../utils";

export default async function Home() {
  const apiData = await fetch("http://localhost:3000/api");
  const apiDataRows: DataRow[] = await apiData.json();
  const tableRows: TableRow[] = formatTableRows(apiDataRows);

  console.log(">>> tableRows", tableRows);

  return (
    <main className="flex min-h-screen flex-col">
      <h1>HockeyStack Frontend Challenge</h1>
      <PureTable columns={TABLE_COLUMNS} rows={tableRows} />
    </main>
  );
}
