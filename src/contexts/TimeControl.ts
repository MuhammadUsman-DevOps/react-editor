import { SetStatus, SetTime, Status } from './types';

class TimeControl {
  public time: number;
  private interval: NodeJS.Timer;
  private lastUpdatedTime: number;
  private updateTime: SetTime;
  private setStatus: SetStatus;
  private status: Status;

  constructor({
    updateTime,
    setStatus,
  }: {
    updateTime: SetTime;
    setStatus: SetStatus;
  }) {
    this.status = 'STOPPED';
    this.updateTime = updateTime;
    this.setStatus = setStatus;
    this.time = 0;
  }

  public start() {
    if (this.status === 'RUNNING') return;
    this.lastUpdatedTime = Date.now();
    this.interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = now - this.lastUpdatedTime;
      this.lastUpdatedTime = now;
      this.time = this.time + deltaTime;
      this.updateTime(this.time);
      this.status = 'RUNNING';
      this.setStatus('RUNNING');
    }, 16);
  }

  public pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.status = 'PAUSED';
      this.setStatus('PAUSED');
    }
  }

  public reset() {
    if (this.interval) {
      clearInterval(this.interval);
      this.time = 0;
      this.status = 'STOPPED';
      this.setStatus('STOPPED');
      this.updateTime(0);
    }
  }

  public setTime(time: number) {
    this.time = time;
    this.updateTime(time);
  }
  public destroy = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.status = 'STOPPED';
      this.setStatus('STOPPED');
    }
  };
}

export default TimeControl;
