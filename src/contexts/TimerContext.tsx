import React from 'react';
import TimeControl from './TimeControl';
import { Status, TimerState } from './types';

export const TimerContext = React.createContext<TimerState>({
  time: 0,
  setTime: () => {},
  status: 'STOPPED',
  setStatus: () => {},
  start: () => {},
  pause: () => {},
  reset: () => {},
});

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [time, updateTime] = React.useState<number>(0);
  const [status, setStatus] = React.useState<Status>('STOPPED');
  const [timeControl, setTimeControl] = React.useState<TimeControl>();

  const start = React.useCallback(() => {
    if (timeControl) {
      timeControl.start();
    }
  }, [timeControl]);

  const pause = React.useCallback(() => {
    if (timeControl) {
      timeControl.pause();
    }
  }, [timeControl]);

  const reset = React.useCallback(() => {
    if (timeControl) {
      timeControl.reset();
    }
  }, [timeControl]);

  const setTime = React.useCallback(
    (newTime: number) => {
      if (timeControl) {
        timeControl.setTime(newTime);
      }
    },
    [timeControl]
  );

  React.useEffect(() => {
    const tc = new TimeControl({
      updateTime,
      setStatus,
    });
    setTimeControl(tc);
  }, []);

  return (
    <TimerContext.Provider
      value={{ time, setTime, status, setStatus, start, reset, pause }}
    >
      {children}
    </TimerContext.Provider>
  );
};
