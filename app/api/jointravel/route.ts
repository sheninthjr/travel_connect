import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { travelId, userId, phone } = body; // Include phone in the request body
    const travel = await prisma.travel.findUnique({
      where: { id: travelId },
    });

    if (!travel) {
      return NextResponse.json({ error: "Travel not found" }, { status: 404 });
    }

    if (travel.seats > 0) {
      await prisma.travelUser.create({
        data: {
          userId: userId,
          travelId: travelId,
          phone: phone,
        },
      });

      const updatedTravel = await prisma.travel.update({
        where: { id: travelId },
        data: {
          seats: travel.seats - 1,
        },
      });

      return NextResponse.json(updatedTravel, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No available seats" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error while joining the travel:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
