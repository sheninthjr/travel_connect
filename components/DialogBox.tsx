"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinPlus } from "lucide-react";
import { CalendarPicker } from "./CalendarPicker";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export function DialogBox() {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const [locationFrom, setLocationFrom] = useState("");
  const { data: session } = useSession();
  const image = session?.user?.image;
  const [locationTo, setLocationTo] = useState("");
  const [gender, setGender] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [seats, setSeats] = useState<number>();
  const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const handleSave = async () => {
    const formattedTime = formatTime(time);
    const userId = localStorage.getItem("userId");
    const travelData = {
      userId,
      name,
      image,
      locationFrom,
      locationTo,
      gender,
      vehicleType,
      seats,
      time: formattedTime,
      selectedDate: selectedDate,
    };

    try {
      const response = await axios.post("/api/createtravel", travelData);
      if (response) {
        toast({
          variant: "success",
          title: "Successfully created",
          description: "Your travel was successfully added to the list",
        });
        setOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to add your travel to the list",
        });
      }
    } catch (error) {
      console.error("Error creating travel:", error);
    }
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);

    const isPM = hour >= 12;
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = isPM ? "PM" : "AM";

    return `${formattedHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${amPm}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="gap-4 font-semibold text-2xl text-black flex p-2 justify-center bg-white rounded-lg cursor-pointer">
          <MapPinPlus className="self-center" size={"25"} /> Create
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono text-3xl">
            Create a Travel
          </DialogTitle>
          <DialogDescription className="font-mono">
            Add your location of your travel so that others can join with you
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 font-mono">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="locationfrom" className="text-right">
              From
            </Label>
            <Input
              id="locationfrom"
              className="col-span-3"
              value={locationFrom}
              onChange={(e) => setLocationFrom(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="locationto" className="text-right">
              To
            </Label>
            <Input
              id="locationto"
              className="col-span-3"
              value={locationTo}
              onChange={(e) => setLocationTo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Select onValueChange={setGender}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="TRANSGENDER">Transgender</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vechicletype" className="text-right">
              Type
            </Label>
            <Select onValueChange={setVehicleType}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CAR">Car</SelectItem>
                  <SelectItem value="BIKE">Bike</SelectItem>
                  <SelectItem value="AUTO">Auto</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="seat" className="text-right">
              No of Seat
            </Label>
            <Input
              id="seat"
              className="col-span-3"
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              className="col-span-3"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <CalendarPicker
              selectedDate={selectedDate!}
              onDateChange={setSelectedDate as DateConstructor}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
