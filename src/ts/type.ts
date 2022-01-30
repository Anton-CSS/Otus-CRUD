export type EventType = {
  id: number;
  date: string;
  fill: boolean;
  tag?: string;
  status?: boolean;
  text?: string;
};

export type PostEventType = {
  id: number;
  tag: string;
  text: string;
  status?: boolean;
};
