import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const travels = await prisma.travel.findMany();
    return NextResponse.json(travels);
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
