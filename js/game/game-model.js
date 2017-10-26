import {addPlayerAnswer, nextLevel, setLives, updateGameTime} from './game-utils';
import {games} from '../data/initial-data';

/** Class representing game model*/
class GameModel {
  /**
   * Create new game
   * @param {Array} data - Contains games data
   */
  constructor(data = games) {
    this.data = data;
  }

  /**
   * Update game state
   * @param {Object} newState
   * @return {Object}
   */
  update(newState) {
    this.state = newState;
    return this.state;
  }

  /**
   * Update state time
   * @param {number} time
   */
  updateTime(time) {
    this.update(updateGameTime(this.state, time));
  }

  /**
   * Define if player has attempts
   * @return {boolean}
   */
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
  defineNextQuestion() {
    this.update(nextLevel(this.state));
  }


  /**
   * Return current question data
   * @return {Object}
   */
  getQuestion() {
    return this.data[this.state.questionIndex];
  }

  /**
   * Add player's answer to game state
   * @param {Object} answer
   */
  addPlayerAnswer(answer) {
    this.update(addPlayerAnswer(this.state, answer));
  }
}

export default GameModel;
