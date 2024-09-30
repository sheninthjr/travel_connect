import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.user.findMany();
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ message: "Error while fetching user", e });
  }
}
