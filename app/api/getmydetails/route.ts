import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "UserId is required" },
      { status: 400 },
    );
  }

  try {
    const response = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!response) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { message: "Error while fetching user", error: e },
      { status: 500 },
    );
  }
}
