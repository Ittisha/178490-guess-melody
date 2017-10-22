/** Class representing a level of a game*/
class Level {
  /**
   * Create a level
   * @param {string} type - Level type
   * @param {string} taskMessage - Level task
   * @param {string} variantsNumber - Level answers variants quantity
   */
  constructor(type, taskMessage, variantsNumber) {
    this.type = type;
    this.taskMessage = taskMessage;
    this.variantsNumber = variantsNumber;
    this._answers = new Set();
  }

  /**
   * Method for getting answers
   * @return {Set} Answer variants
   */
  get answers() {
    return this._answers;
  }

  /**
   * Method for adding answers
   */
  addAnswers() {

  }

}

export default Level;
