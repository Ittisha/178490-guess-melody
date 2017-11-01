/** Class representing a timer */
class Timer {
  /**
   * Create a timer
   * @param {number} remainingTime - The time timer will count down
   */
  constructor(remainingTime) {
    this.time = remainingTime;
  }

  /**
   * Count down time
   * @return {number} Return -1 if time ends, if time >=0 return remaining time
   */
  tick() {
    if (this.time === 0) {
      return -1;
    }

    this.time -= 1000;
    return this.time;
  }
}

export default Timer;
