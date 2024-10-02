"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { PopUpDialog } from "@/components/PopUpDialog";
import { TravelProps } from "@/interface/TravelProps";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [travels, setTravels] = useState<TravelProps[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<TravelProps | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get("/api/gettravel");
        setTravels(response.data);
      } catch (error) {
        console.error("Error fetching travel data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTravels();
  }, []);

  const currentDateTime = new Date();

  const upcomingTravels = travels.filter((travel) => {
    const [day, month, year] = travel.date.split("/");
    const travelDateTime = new Date(`${month} ${day}, ${year} ${travel.time}`);
    return travel.seats > 0 && travelDateTime > currentDateTime;
  });

  const sortedTravel = upcomingTravels.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const travelADateTime = new Date(`${monthA} ${dayA}, ${yearA} ${a.time}`);

    const [dayB, monthB, yearB] = b.date.split("/");
    const travelBDateTime = new Date(`${monthB} ${dayB}, ${yearB} ${b.time}`);

    return travelADateTime.getTime() - travelBDateTime.getTime();
  });

  const handleJoinClick = (travel: TravelProps) => {
    setSelectedTravel(travel);
  };

  const handleCloseDialog = () => {
    setSelectedTravel(null);
  };

  return (
    <div className="flex h-screen justify-start items-start pt-4 pl-4 pr-4">
      <main className="max-w-5xl w-full overflow-y-auto h-screen">
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
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-16" />{" "}
                      <Skeleton className="h-8 w-24" />{" "}
                    </div>
                    <Skeleton className="h-8 w-16" />{" "}
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
                      <div className="font-bold font-mono text-xl">
                        {travel.name}
                      </div>
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
                      <Button variant={"destructive"}>
                        Seat: {travel.seats}
                      </Button>
                    </div>
                    <Button onClick={() => handleJoinClick(travel)}>
                      Join
                    </Button>
                  </div>
                </Card>
              ))}
        </div>
      </main>
      {selectedTravel && (
        <PopUpDialog
          travelId={selectedTravel.id}
          userName={selectedTravel.name}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
