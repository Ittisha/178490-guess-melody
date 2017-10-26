import {addPlayerAnswer, nextLevel, setLives, updateGameTime} from "./game-utils";
import {games} from "../data/initial-data";

/** Class representing game*/
class Game {
  /**
   * Create new game
   * @param {Array} data - Contains games data
   */
  constructor(data = games) {
    this.data = data;
  }

  update(newState) {
    this.state = newState;
    return this.state;
  }

  updateTime(time) {
    this.update(updateGameTime(this.state, time));
  }


  canPlay() {
    return this.state.lives >= 0;
  }
  /**
   * Method for reducing one life
   */
  reduceLives() {
    if (this.canPlay()) {
      this.update(setLives(this.state, this.state.lives - 1));
    }
  }

  /**
   * Set next question number and index
   */
  determineNextQuestion() {
    this.update(nextLevel(this.state));
  }


  /**
   * Return current question data
   * @return {Object}
   */
  getQuestion() {
    return this.data[this.state.questionIndex];
  }

  addPlayerAnswer(answer) {
    this.update(addPlayerAnswer(this.state, answer));
  }
}

export default Game;
