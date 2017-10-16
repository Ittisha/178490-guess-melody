/** Class representing game*/
class Game {
  /**
   * Create new game
   * @param {Object} initialState - Contains questionsLeftNumber, questionIndex,
   * timeLeft, lives, playerAnswers
   */
  constructor(initialState) {
    this.questionsLeftNumber = initialState.questionsLeftNumber;
    this.questionIndex = initialState.questionIndex;
    this.timeLeft = initialState.timeLeft;
    this.lives = initialState.lives;
    this.playerAnswers = initialState.playerAnswers;
  }

  /**
   * Method for reducing one life
   */
  reduceLives() {
    if (this.lives >= 0) {
      --this.lives;
    }
  }

  /**
   * Set next question number and index
   */
  determineNextQuestion() {
    if (this.questionsLeftNumber > 0) {
      --this.questionsLeftNumber;
      ++this.questionIndex;
    }
  }

  /**
   * Reset players answers
   */
  resetPlayerAnswers() {
    this.playerAnswers = [];
  }

}

export default Game;
