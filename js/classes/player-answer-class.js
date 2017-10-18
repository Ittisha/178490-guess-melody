/** Class representing player answer*/
class PlayerAnswer {
  /**
   * Create a player answer
   * @param {boolean} boolean -  was the answer true or false
   * @param {number} time - Time spent on the answer
   */
  constructor(boolean, time = 30000) {
    this.isRightAnswer = boolean;
    this.time = time;
  }
}

export default PlayerAnswer;
