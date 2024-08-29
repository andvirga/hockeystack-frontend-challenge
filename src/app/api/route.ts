import { NextResponse } from "next/server";
import { pagesData } from "@/data/pages";

export async function GET() {
    return NextResponse.json(pagesData);
}