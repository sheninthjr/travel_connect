import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if(userId) {
    const travels = await prisma.travelUser.findMany({
      where: { userId: userId },
      include: {
        travel: true,
      },
    });

    const travelHistory = travels.map((entry) => entry.travel);

    return NextResponse.json(travelHistory, { status: 200 });
  }
  } catch (error) {
    console.error("Error fetching travel history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
