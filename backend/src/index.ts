import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const users: {
  [key: string]: {
    room: string;
    ws: WebSocket;
  };
} = {};

let id = 1;

wss.on("connection", function connection(ws) {
  const wsId = id++;
  ws.on("message", function message(data) {
    const response = JSON.parse(data.toString());
    if (response.type === "join") {
      users[wsId] = {
        room: response.payload.roomId,
        ws,
      };
    }
    if (response.type === "message") {
      const roomId = users[wsId].room;
      const message = response.payload.message;
      Object.keys(users).forEach((wsId) => {
        if (users[wsId].room === roomId) {
          users[wsId].ws.send(
            JSON.stringify({
              payload: {
                message,
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
