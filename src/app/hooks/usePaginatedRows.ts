import { TableRow } from "../types";

interface IusePaginatedRowsProps {
    rows: TableRow[],
    page: number,
    pageSize: number,
}

export const usePaginatedRows = ({ rows, page, pageSize }: IusePaginatedRowsProps) => {
    const firstElement = (page - 1) * pageSize;
    return rows.slice(firstElement, firstElement + pageSize);
}
