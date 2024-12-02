"use client";
import { History, Home, Send, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { DialogBox } from "./DialogBox";
import { useState } from "react";
import React from "react";

export function SideBar() {
  return (
    <>
      <DesktopSideBar />
      <MobileSideBar />
    </>
  );
}

function DesktopSideBar() {
  return (
    <div className="hidden font-mono md:flex lg:flex w-1/4 flex-col justify-between p-6 space-y-6 border-r border-slate-700 shadow-lg h-full">
      <div className="flex flex-col space-y-6">
        <Link
          href="/"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Home className="self-center" size={"25"} /> Home
        </Link>
        <Link
          href="/history"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <History className="self-center" size={"25"} /> History
        </Link>
        <Link
          href="/chat"
          className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
        >
          <Send className="self-center" size={"25"} /> Chat
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

export function MobileSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className={`lg:hidden md:hidden fixed z-50 text-white`}
        style={{
          right: isOpen ? "100px" : "auto",
          top: isOpen ? "10px" : "15px",
          left: isOpen ? "auto" : "16px",
        }}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden lg:hidden fixed top-0 left-0 w-72 bg-background z-40 h-full p-6 space-y-6 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-6 h-full">
          <div className="flex-grow flex flex-col space-y-6">
            <Link
              href="/"
              className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
            >
              <Home className="self-center text-white" size={"25"} /> Home
            </Link>
            <Link
              href="/history"
              className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
            >
              <History className="self-center text-white" size={"25"} /> History
            </Link>
            <Link
              href="/chat"
              className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
            >
              <Send className="self-center text-white" size={"25"} /> Chat
            </Link>
            <Link
              href="/settings"
              className="gap-4 font-bold text-2xl text-white flex pl-4 py-2 transition-colors duration-300 hover:bg-[#181818] rounded-lg cursor-pointer"
            >
              <Settings className="self-center text-white" size={"25"} />{" "}
              Settings
            </Link>
          </div>
          <div className="flex flex-col justify-end">
            <DialogBox />
          </div>
        </div>
      </div>
    </div>
  );
}
