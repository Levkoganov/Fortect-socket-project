import express from "express";
import cors from "cors";
import logger from "morgan";
import http from "http";
import { Server } from "socket.io";
import { startEventGeneration } from "./events/events";
import { markAsReadSocketHandler } from "./handler/clientSockets";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

startEventGeneration(io);
markAsReadSocketHandler(io);


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

