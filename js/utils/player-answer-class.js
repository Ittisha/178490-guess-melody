/** Class representing player answer*/
class PlayerAnswer {
  /**
   * Create a player answer
   * @param {boolean} isRight -  was the answer true or false
   * @param {number} time - Time spent on the answer
   */
  constructor(isRight, time) {
    this.isRightAnswer = isRight;
    this.time = time;
  }
}

export default PlayerAnswer;
