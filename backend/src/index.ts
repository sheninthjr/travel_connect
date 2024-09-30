import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const users: {
  [key: string]: {
    room: string;
    senderId: string;
    ws: WebSocket;
  };
} = {};

const roomMessages: {
  [roomId: string]: {
    message: string;
    senderId: string;
  }[];
} = {};

let id = 1;

wss.on("connection", function connection(ws) {
  const wsId = id++;

  ws.on("message", function message(data) {
    const response = JSON.parse(data.toString());

    if (response.type === "join") {
      const roomId = response.payload.roomId;
      const senderId = response.payload.senderId;

      users[wsId] = {
        room: roomId,
        senderId,
        ws,
      };

      if (roomMessages[roomId]) {
        roomMessages[roomId].forEach((msg) => {
          ws.send(
            JSON.stringify({
              type: "message",
              payload: {
                message: msg.message,
                senderId: msg.senderId,
              },
            }),
          );
        });
      }
    }

    if (response.type === "message") {
      const roomId = users[wsId].room;
      const message = response.payload.message;
      const senderId = response.payload.senderId;

      if (!roomMessages[roomId]) {
        roomMessages[roomId] = [];
      }
      roomMessages[roomId].push({ message, senderId });

      Object.keys(users).forEach((userId) => {
        if (users[userId].room === roomId) {
          users[userId].ws.send(
            JSON.stringify({
              type: "message",
              payload: {
                message,
                senderId,
              },
            }),
          );
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});
