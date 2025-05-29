import { Server } from "socket.io";
import { randomUUID } from "crypto";
import { eventList } from "../eventList";
import { EventData } from "../types";

const events = [
  "New user signed up",
  "Stock price updated",
  "Sensor triggered",
  "Chat message received",
];

function getRandomEvent() {
  const randomIndex = Math.floor(Math.random() * events.length);
  return events[randomIndex];
}

export function startEventGeneration(io: Server) {
  setInterval(() => {
    const event: EventData = {
      id: randomUUID(),
      type: getRandomEvent(),
      timestamp: new Date().toISOString(),
      confirmed: false,
    };
    eventList.unshift(event);
    io.emit("newEvent", event);
  }, Math.random() * (10000 - 5000) + 5000);
}
