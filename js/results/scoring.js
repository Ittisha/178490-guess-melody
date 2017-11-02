/**
 * Enum answer properties
 * @readonly
 * @enum {number}
 */
const Answer = {
  QUANTITY: 10,
  QUICK_TIME: 30000,
  PENALTY: -2,
  QUICK_ANSWER_SCORE: +2,
  SLOW_ANSWER_SCORE: +1
};


/**
 * Get score for particular answer
 * @param {number} time - Time in milliseconds
 * @param {boolean} truth - Is answer true or false
 * @return {number} Score for particular answer
 */
const getAnswerScore = (time, truth) => {
  if (!truth) {
    return Answer.PENALTY;
  }
  if (time < Answer.QUICK_TIME) {
    return Answer.QUICK_ANSWER_SCORE;
  }
  return Answer.SLOW_ANSWER_SCORE;
};

/**
 * Count up player's score including penalty
 * @param {Array} playerAnswers - Array of answer objects
 * @param {number} remainingNotes - Number of remaining notes
 * @return {number} Player's total score
 */
const countUpScores = (playerAnswers, remainingNotes) => {
  if (playerAnswers.length < Answer.QUANTITY || remainingNotes < 0) {
    return -1;
  }

  return playerAnswers.reduce((score, elem) => {
    return score + getAnswerScore(elem.time, elem.isRightAnswer);
  }, 0);
};

const getQuickAnswersScore = (playerAnswers) => {
  return playerAnswers.filter((answer) => answer.isRightAnswer && (answer.time < Answer.QUICK_TIME))
      .reduce((score) => {
        return score + Answer.QUICK_ANSWER_SCORE;
      }, 0);
};

export {countUpScores, getQuickAnswersScore};
