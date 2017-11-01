import {games} from '../data/initial-data';
import {countUpScores} from '../results/scoring';
import {getQuickAnswersScore} from '../results/scoring';

/**
 * Set player's lives
 * @param {Object} state - Game state
 * @param {number} lives - New lives quantity
 * @return {Object} new state
 */
const setLives = (state, lives) => {
  state = Object.assign({}, state);
  state.lives = lives;
  return state;
};

/**
 * Return level data
 * @param {number} levelIndex
 * @param {Array} data
 * @return {Object} level data
 */
const getLevel = (levelIndex, data = games) => data[levelIndex];

/**
 * Define next level state
 * @param {Object} state - This level state
 * @param {Array} data - Array of game levels tasks
 * @return {Object} next level state
 */
const nextLevel = (state, data = games) => {
  const next = state.questionIndex + 1;

  if (!getLevel(next, data)) {
    throw new RangeError(`Can't find level ${next}`);
  }

  state = Object.assign({}, state);
  state.questionIndex = next;
  state.questionsLeftNumber--;

  return state;
};

/**
 * Add player answer to state
 * @param {Object} state - Current state
 * @param {Object} answer - Player answer
 * @return {Object} new state
 */
const addPlayerAnswer = (state, answer) => {
  const answers = state.playerAnswers.concat(answer);

  state = Object.assign({}, state);
  state.playerAnswers = answers;

  return state;
};

/**
 * Get player game result
 * @param {Object} state
 * @return {Object} player result
 */
const getPlayerResults = (state) => ({
  score: countUpScores(state.playerAnswers, state.lives),
  remainingLives: state.lives,
  remainingTime: state.timeLeft,
  quickScores: getQuickAnswersScore(state.playerAnswers)
});

/**
 * Update game time
 * @param {Object} state - Current level state
 * @param {number} time - New time
 * @return {Object} new state
 */
const updateGameTime = (state, time) => {
  state = Object.assign({}, state);
  state.timeLeft = time;

  return state;
};

export {getLevel,
  nextLevel,
  setLives,
  addPlayerAnswer,
  getPlayerResults,
  updateGameTime
};
