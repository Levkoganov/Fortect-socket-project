import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "../store/eventSlice";
import type { RootState } from "../store/store";
import socket from "../socket"; // ✅ Use the shared instance

function ConnectionStatus() {
  const dispatch = useDispatch();
  const connected = useSelector((state: RootState) => state.event.connected);

  useEffect(() => {
    socket.on("connect", () => dispatch(setConnected(true)));
    socket.on("disconnect", () => dispatch(setConnected(false)));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</h1>
    </div>
  );
}

export default ConnectionStatus;
