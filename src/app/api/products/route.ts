import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";
import type { RowDataPacket } from "mysql2";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM product");
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.formData();
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const image = data.get("image") as File | null;

    if (!image)
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathFile = path.join(process.cwd(), "public", image.name);
    await writeFile(pathFile, buffer);

    const result: RowDataPacket = await pool.query(
      "INSERT INTO product SET ?",
      {
        name,
        description,
        price,
      }
    );
    console.log(result);

    return NextResponse.json({
      name,
      description,
      price,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
