/** @constant {number} */
const TIMER_TICK_INTERVAL = 1000;

/** Class representing a timer */
class Timer {
  /**
   * Create a timer
   * @param {number} remainingTime - The time timer will count down
   */
  constructor(remainingTime) {
    this._time = remainingTime;
  }

  /**
   * Get current time
   * @return {number}
   */
  get time() {
    return this._time;
  }

  /**
   * Count down time
   * @return {number} Return -1 if time ends, if time >=0 return remaining time
   */
  tick() {
    if (this._time === 0) {
      return -1;
    }

    this._time -= TIMER_TICK_INTERVAL;
    return this._time;
  }
}

export default Timer;
