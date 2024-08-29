import { DataRow, TableRow } from "./types";

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Ensure that seconds are always two digits
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
}

export const formatTableRows = (apiDataRows: DataRow[]): TableRow[] => {
    return apiDataRows.map((row) => ({
        url: row.url,
        scroll: row.avgScrollPercentage,
        time: row.totalPageviewCount,
        bounce: Math.ceil(row.bounceCount * 100 / row.totalCount),
        enters: row.startsWithCount,
        exits: row.endsWithCount,
        pageViews: row.totalCount,
        visitors: row.totalVisitorCount,
    }))
}