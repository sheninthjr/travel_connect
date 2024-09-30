"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export default function Home() {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get("/api/gettravel");
        setTravels(response.data);
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    };

    fetchTravels();
  }, []);

  return (
    <div className="flex h-screen justify-start items-start pt-4 pl-4">
      <main className="max-w-5xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {travels.map((travel) => (
            <Card
              key={travel.id}
              className="p-6 space-y-4 shadow-md rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={travel.image} alt={travel.name} />
                  </Avatar>
                  <div className="font-bold text-xl">{travel.name}</div>
                </div>
                <div className="text-gray-400">{travel.gender}</div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div>
                  <strong>Location: </strong>
                  {travel.from} - {travel.to}
                </div>
                <div>
                  <strong>Date: </strong>
                  {travel.date}
                </div>
                <div>
                  <strong>Time: </strong>
                  {travel.time}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant={"secondary"}>{travel.type}</Button>
                  <Button variant={"destructive"}>Seat: {travel.seats}</Button>
                </div>
                <Button>Join</Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
