import { TableColumn } from "./types";

export const TABLE_COLUMNS: TableColumn[] = [
    {
        label: "URL",
        key: "url",
        type: "url"
    },
    {
        label: "Scroll",
        key: "scroll",
        type: "percentage"
    },
    {
        label: "Time",
        key: "time",
        type: "time"
    },
    {
        label: "Bounce",
        key: "bounce",
        type: "percentage"
    },
    {
        label: "Enters",
        key: "enters",
        type: "number"
    },
    {
        label: "Exits",
        key: "exits",
        type: "number"
    },
    {
        label: "Page Views",
        key: "pageViews",
        type: "number"
    },
    {
        label: "Visitors",
        key: "visitors",
        type: "number"
    }
]

export const NUMBER_ROWS_PER_PAGE = 10;

export const TOTAL_PAGES = 50;
