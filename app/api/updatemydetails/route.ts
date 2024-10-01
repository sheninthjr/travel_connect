import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...userData } = body;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });
    return NextResponse.json(
      { message: "User information updated successfully", updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
