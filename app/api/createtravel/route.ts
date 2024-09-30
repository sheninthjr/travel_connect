import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      name,
      image,
      locationFrom,
      locationTo,
      gender,
      vehicleType,
      seats,
      time,
      selectedDate,
    } = body;

    if (
      !name ||
      !locationFrom ||
      !image ||
      !locationTo ||
      !gender ||
      !vehicleType ||
      !seats ||
      !time ||
      !selectedDate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const travel = await prisma.travel.create({
      data: {
        name,
        image,
        from: locationFrom,
        to: locationTo,
        gender,
        type: vehicleType,
        seats: parseInt(seats),
        time,
        date: selectedDate,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Travel created successfully",
        travel,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating travel:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
