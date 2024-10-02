"use client";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { WS_URL } from "@/config";
import { generateRoomId } from "@/utils/generateRoomId";

export function Chatting({
  userId,
  name,
  image,
}: {
  userId: string;
  name: string;
  image: string;
}) {
  const [message, setMessage] = useState<string>("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [serverMessages, setServerMessages] = useState<
    {
      message: string;
      senderId: string;
    }[]
  >([]);
  const myId = localStorage.getItem("userId") || "";
  const roomId = generateRoomId({ userId1: myId, userId2: userId });
  console.log(roomId);
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setServerMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.payload.message,
          senderId: data.payload.senderId,
        },
      ]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
            senderId: userId,
          },
        }),
      );
    };

    setWebSocket(ws);
  }, [userId]);

  const handleMessage = () => {
    if (webSocket && message.trim()) {
      webSocket.send(
        JSON.stringify({
          type: "message",
          payload: {
            message: message.trim(),
            senderId: userId,
          },
        }),
      );
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessage();
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [serverMessages]);

  return (
    <main className="flex flex-col flex-grow bg-background h-screen">
      <header className="p-4 border-b border-slate-700">
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={image} alt={name} />
          </Avatar>
          <span className="text-xl font-bold">{name}</span>
        </div>
      </header>
      <div
        className="flex-grow p-4 overflow-y-auto scroll-smooth"
        style={{ maxHeight: "90vh" }}
        ref={messagesContainerRef}
      >
        {serverMessages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`bg-white text-black p-2 rounded-xl max-w-xs shadow-md ${
                msg.senderId === userId ? "rounded-br-none" : "rounded-bl-none"
              }`}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <footer className="flex p-4 gap-4 mb-16 items-center">
        <Textarea
          className="border-slate-700 text-lg"
          placeholder="Type your message..."
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant={"default"} onClick={handleMessage}>
          Send
        </Button>
      </footer>
    </main>
  );
}
