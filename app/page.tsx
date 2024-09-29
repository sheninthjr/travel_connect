"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex h-screen justify-start items-start pt-4 pl-4">
      <main className="max-w-5xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card className="p-6 space-y-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Sheninth Jr</div>
              <div className="">Male</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div>
                <strong>Location: </strong>Koyambedu - Redhills
              </div>
              <div>
                <strong>Date: </strong>12-11-2024
              </div>
              <div>
                <strong>Time: </strong>9:00 AM
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button variant={"secondary"}>Car</Button>
                <Button variant={"destructive"}>Seat:4</Button>
              </div>
              <Button>Join</Button>
            </div>
          </Card>
          <Card className="p-6 space-y-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Sheninth Jr</div>
              <div className="">Male</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div>
                <strong>Location: </strong>Koyambedu - Redhills
              </div>
              <div>
                <strong>Date: </strong>12-11-2024
              </div>
              <div>
                <strong>Time: </strong>9:00 AM
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button variant={"secondary"}>Car</Button>
                <Button variant={"destructive"}>Seat:4</Button>
              </div>
              <Button>Join</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
