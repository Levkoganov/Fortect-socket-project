export interface IEvent {
  id: string;
  type: string;
  timestamp: string;
  confirmed: boolean;
}

export interface IEventState {
  events: IEvent[];
  connected: boolean;
}
