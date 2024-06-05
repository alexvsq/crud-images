import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";
import type { RowDataPacket } from "mysql2";

export async function GET() {
  const result: RowDataPacket[] = await pool.query("SELECT now()");
  return NextResponse.json({ message: result[0] });
}
