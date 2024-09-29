"use client";
import { useState } from "react";
import { Command, CommandInput } from "@/components/ui/command";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="p-2">
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search your travel location"
        />
      </Command>
      <div className="text-white">{searchQuery}</div>
    </div>
  );
}
