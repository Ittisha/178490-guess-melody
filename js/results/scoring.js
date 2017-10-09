const ANSWERS_NUMBER = 10;
const TIME_FOR_QUICK_ANSWER = 30000;

/**
 * Count up player's score including penalty
 * @param {Array} playerAnswers - array of answer objects
 * @param {number} remainingNotes - number of remaining notes
 * @return {number} player's total score
 */
const countUpScores = (playerAnswers, remainingNotes) => {
  if (playerAnswers.length < ANSWERS_NUMBER || remainingNotes < 0) {
    return -1;
  }

  const rightAnswersScore = playerAnswers.filter((element) => element.truthfulness)
      .reduce((score, elem) => {
        if (elem.time < TIME_FOR_QUICK_ANSWER) {
          return score + 2;
        }
        return ++score;
      }, 0);

  const wrongAnswersPenalty = playerAnswers.filter((element) => !element.truthfulness)
      .reduce((penalty) => penalty - 2, 0);

  return rightAnswersScore + wrongAnswersPenalty;
};

export default countUpScores;
