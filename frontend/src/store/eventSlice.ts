import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IEvent, IEventState } from "../types";

const initialState: IEventState = {
  events: [],
  connected: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<IEvent>) {
      state.events.unshift(action.payload);
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    markEventAsRead: (state, action: PayloadAction<string>) => {
      const event = state.events.find((e) => e.id === action.payload);
      if (event) {
        event.confirmed = true;
      }
    },
  },
});

export const { addEvent, setConnected, markEventAsRead } = eventSlice.actions;
export default eventSlice.reducer;
