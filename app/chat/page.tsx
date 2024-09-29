import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Chat() {
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-1/3 border-r border-slate-700 bg-background pl-4 pr-4 overflow-y-auto">
          <h2 className="p-4 font-extrabold text-2xl">Messages</h2>
          <ul className="space-y-2 text-xl font-semibold">
            <li className="p-4 hover:bg-[#181818] rounded-xl cursor-pointer">
              User 1
            </li>
            <li className="p-4 hover:bg-[#181818] rounded-lg cursor-pointer">
              User 2
            </li>
            <li className="p-4 hover:bg-[#181818] rounded-lg cursor-pointer">
              User 3
            </li>
          </ul>
        </aside>
        <main className="flex flex-col flex-grow bg-background">
          <header className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold">Chatting with User</h2>
          </header>
          <div
            className="flex-grow p-4 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            <div className="mb-4 flex justify-start">
              <span className="bg-white text-black p-2 rounded-lg max-w-xs">
                Hello!
              </span>
            </div>
            <div className="mb-4 flex justify-end">
              <span className="bg-white text-black p-2 rounded-lg max-w-xs ml-auto">
                Hi there!
              </span>
            </div>
          </div>
          <footer className="flex p-4 gap-4 mb-16 items-center">
            <Textarea
              className="border-slate-700 text-lg"
              placeholder="Type your message..."
            />
            <Button variant={"default"}>Send</Button>
          </footer>
        </main>
      </div>
    </div>
  );
}
