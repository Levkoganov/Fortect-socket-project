import { Server, Socket } from "socket.io";
import { eventList } from "../eventList";

export function markAsReadSocketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("markAsRead", (data: { id: string }) => {
      const event = eventList.find((e) => e.id === data.id);
      if (event) {
        event.confirmed = true;
        console.log(`Message marked as read:`, data);
      } else {
        console.log("something went wrong");
      }
    });
  });
}