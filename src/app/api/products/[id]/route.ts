import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";
import type { RowDataPacket } from "mysql2";

type Params = {
  id: string;
};

type Result = RowDataPacket;

export async function GET(
  req: Request,
  context: { params: Params },
  res: Response
) {
  try {
    const id = context.params.id;
    const result: Result = await pool.query(
      "SELECT * FROM product WHERE id = ? ",
      [id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        { message: "producto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Params },
  res: Response
) {
  try {
    const id = context.params.id;
    const result: Result = await pool.query(
      "DELETE FROM product WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Params },
  res: Response
) {
  try {
    const id = context.params.id;
    const data = await req.json();
    const result: Result = await pool.query("UPDATE product SET ? WHERE id=?", [
      data,
      id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "producto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
