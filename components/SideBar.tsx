import { Contact, Home, Search, Send, Settings } from "lucide-react";
import Link from "next/link";
import { DialogBox } from "./DialogBox";

export function SideBar() {
  return (
    <div className="w-1/4 flex flex-col justify-between p-6 space-y-6 border-r border-slate-700 shadow-lg h-full">
      <div className="flex flex-col space-y-6">
        <Link
          href="/"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Home className="self-center" size={"25"} /> Home
        </Link>
        <Link
          href="/explore"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Search className="self-center" size={"25"} /> Explore
        </Link>
        <Link
          href="/chat"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Send className="self-center" size={"25"} /> Chat
        </Link>
        <Link
          href="/connect"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Contact className="self-center" size={"25"} /> Connect
        </Link>
        <Link
          href="/settings"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Settings className="self-center" size={"25"} /> Settings
        </Link>
      </div>
      <div className="flex flex-col justify-end space-y-2">
        <DialogBox />
      </div>
    </div>
  );
}
