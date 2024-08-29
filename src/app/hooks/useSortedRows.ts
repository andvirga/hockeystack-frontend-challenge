import { SortBy, TableRow } from "../types";

interface IuseSortedRowsProps {
    rows: TableRow[],
    sortBy: SortBy,
}

export const useSortedRows = ({ rows, sortBy }: IuseSortedRowsProps) => {
    const columnToSort = sortBy.column;
    if (columnToSort === "none" || sortBy.direction === "none") return rows;

    const sortedData = [...rows].sort((a, b) => {
        const firstValue = a[columnToSort.key]
        const secondValue = b[columnToSort.key]
        if (firstValue < secondValue)
            return sortBy?.direction === "asc" ? -1 : 1;
        if (firstValue > secondValue)
            return sortBy?.direction === "asc" ? 1 : -1;
        return 0;
    })

    return sortedData;
}
