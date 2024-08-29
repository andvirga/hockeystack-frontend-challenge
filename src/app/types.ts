export interface DataRow {
    url: string,
    totalCount: number,
    totalVisitorCount: number,
    bounceCount: number,
    startsWithCount: number,
    endsWithCount: number,
    avgScrollPercentage: number,
    totalPageviewCount: number
}

export type ColumnType = "number" | "percentage" | "time" | "url"

export interface TableColumn {
    key: "url" | "scroll" | "time" | "bounce" | "enters" | "exits" | "pageViews" | "visitors",
    label: string,
    type: ColumnType
}

export interface TableRow {
    url: string,
    scroll: number,
    time: number,
    bounce: number,
    enters: number,
    exits: number,
    pageViews: number,
    visitors: number,
}
