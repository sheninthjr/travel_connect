"use client";
import React, { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Chatting } from "@/components/Chatting";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("userId");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [selectedUserImage, setSelectedUserImage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/getuser");
        const filterUserData = response.data.filter(
          (user) => user.id !== userId,
        );
        setUsers(filterUserData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserClick = (userId: string, username: string, image: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(username);
    setSelectedUserImage(image);
  };

  return (
    <div className="flex flex-col bg-background h-screen">
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-1/3 border-r border-slate-700 bg-background pl-4 pr-4 overflow-y-auto">
          <h2 className="p-4 font-extrabold text-2xl">Messages</h2>

          <div className="relative w-full mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="text-gray-500" />
            </span>
            <Input
              className="pl-10"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ul className="space-y-2 text-xl font-semibold">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center p-4 gap-3 hover:bg-[#181818] rounded-xl cursor-pointer"
                onClick={() => handleUserClick(user.id, user.name, user.image)}
              >
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                </Avatar>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </aside>
        {selectedUserId ? (
          <Chatting
            userId={selectedUserId}
            name={selectedUserName}
            image={selectedUserImage}
          />
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
