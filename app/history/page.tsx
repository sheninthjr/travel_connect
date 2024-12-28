"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { TravelProps } from "@/interface/TravelProps";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export default function History() {
  const [travels, setTravels] = useState<TravelProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user.id;
  const currentDateTime = new Date();

  const upcomingTravels = travels.filter((travel) => {
    const [day, month, year] = travel.date.split("/");
    const travelDateTime = new Date(`${month} ${day}, ${year} ${travel.time}`);
    return travelDateTime > currentDateTime;
  });

  const sortedTravel = upcomingTravels.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const travelADateTime = new Date(`${monthA} ${dayA}, ${yearA} ${a.time}`);

    const [dayB, monthB, yearB] = b.date.split("/");
    const travelBDateTime = new Date(`${monthB} ${dayB}, ${yearB} ${b.time}`);

    return travelADateTime.getTime() - travelBDateTime.getTime();
  });
  useEffect(() => {
    const fetchTravelHistory = async () => {
      try {
        const response = await axios.get(`/api/travelhistory?userId=${userId}`);
        setTravels(response.data);
      } catch (error) {
        console.error("Error fetching travel history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelHistory();
  }, [userId]);

  return (
    <div className="flex h-screen justify-start items-start pt-4 pl-4">
      <main className="max-w-5xl w-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card
                  key={index}
                  className="p-6 space-y-4 shadow-md rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-16 w-16 rounded-full" />{" "}
                      <Skeleton className="h-8 w-32" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </Card>
              ))
            : sortedTravel.map((travel) => (
                <Card
                  key={travel.id}
                  className="p-6 space-y-4 shadow-md rounded-lg bio-container"
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
                </Card>
              ))}
        </div>
      </main>
    </div>
  );
}
