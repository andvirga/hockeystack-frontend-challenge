import PureTable from "../components/PureTable";
import { TABLE_COLUMNS } from "../constants";
import { TableRow, DataRow } from "../types";
import { formatTableRows } from "../utils";

export default async function Home() {
  const apiData = await fetch("http://localhost:3000/api");
  const apiDataRows: DataRow[] = await apiData.json();
  const tableRows: TableRow[] = formatTableRows(apiDataRows);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl pt-8 pb-8">HockeyStack Frontend Challenge</h1>
      <PureTable columns={TABLE_COLUMNS} rows={tableRows} />
    </div>
  );
}
