const ANSWERS_NUMBER = 10;
const TIME_FOR_QUICK_ANSWER = 30000;
const PENALTY = -2;
const QUICK_ANSWER_SCORE = +2;
const SLOW_ANSWER_SCORE = +1;

/**
 * Get score for particular answer
 * @param {number} time - Time in milliseconds
 * @param {boolean} truth - Is answer true or false
 * @return {number} Score for particular answer
 */
const getAnswerScore = (time, truth) => {
  if (!truth) {
    return PENALTY;
  }
  if (time < TIME_FOR_QUICK_ANSWER) {
    return QUICK_ANSWER_SCORE;
  }
  return SLOW_ANSWER_SCORE;
};

/**
 * Count up player's score including penalty
 * @param {Array} playerAnswers - Array of answer objects
 * @param {number} remainingNotes - Number of remaining notes
 * @return {number} Player's total score
 */
const countUpScores = (playerAnswers, remainingNotes) => {
  if (playerAnswers.length < ANSWERS_NUMBER || remainingNotes < 0) {
    return -1;
  }

  return playerAnswers.reduce((score, elem) => {
    return score + getAnswerScore(elem.time, elem.truthfulness);
  }, 0);
};

export default countUpScores;
