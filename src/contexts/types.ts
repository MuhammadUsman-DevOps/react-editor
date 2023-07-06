export type TimerType = "DECREMENTAL" | "INCREMENTAL";

export type Status = "RUNNING" | "PAUSED" | "STOPPED";
export type SetTime = (value: number) => void;
export type SetStatus = (value: Status) => void;

export interface TimerState {
  time: number;
  setTime: SetTime;
  status: Status;
  setStatus: SetStatus;
  start: () => void;
  pause: () => void;
  reset: () => void;
}
