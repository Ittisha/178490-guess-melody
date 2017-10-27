import outputResultMessage from './outputting-result';
import {initialState} from '../data/initial-data';
import {formatTime, getNounPluralForm} from '../utils';

/**
 * Enum for russian words plural forms
 * @readonly
 * @enum {Array}
 */
const WordForm = {
  WORD_SCORE_PLURALS: [`балл`, `балла`, `баллов`],
  WORD_FAST_PLURALS: [`быстрый`, `быстрых`, `быстрых`],
  WORD_MISTAKE_PLURALS: [`ошибку`, `ошибки`, `ошибок`],
  WORD_MINUTE_PLURALS: [`минуту`, `минуты`, `минут`],
  WORD_SECOND_PLURALS: [`секунду`, `секунды`, `секунд`]
};

/**
 * Get loss message
 * @param {Array} stats - Other players statistics
 * @param {Object} playerStats - Current player statistics
 * @return {Object} object with message title and text
 */
const getLossMessages = (stats, playerStats) => {
  if (playerStats.remainingLives === -1) {
    return {
      title: `Какая жалость!`,
      text: outputResultMessage(stats, playerStats)
    };
  }

  return {
    title: `Увы и ах!`,
    text: outputResultMessage(stats, playerStats)
  };

};

/**
 * Get win message
 * @param {Array} stats - Other players statistics
 * @param {Object} playerStats - Current player statistics
 * @return {Object} object with message title, statistics and text
 */
const getWinMessages = (stats, playerStats) => {
  const nounScoreForm = getNounPluralForm(playerStats.score, WordForm.WORD_SCORE_PLURALS);

  const adjFastForm = getNounPluralForm(playerStats.quickScores, WordForm.WORD_FAST_PLURALS);

  const playerMistakeNumber = initialState.lives - playerStats.remainingLives;
  const nounMistakeForm = getNounPluralForm(playerMistakeNumber, WordForm.WORD_MISTAKE_PLURALS);

  const timeSpent = initialState.timeLeft - playerStats.remainingTime;

  const minutes = formatTime(timeSpent).minutes;
  const nounMinuteForm = getNounPluralForm(minutes, WordForm.WORD_MINUTE_PLURALS);

  const seconds = formatTime(timeSpent).seconds;
  const nounSecondForm = getNounPluralForm(seconds, WordForm.WORD_SECOND_PLURALS);

  return {
    title: `Вы настоящий меломан!`,
    statistics: `За&nbsp;${minutes}&nbsp;${nounMinuteForm} и ${seconds}&nbsp;${nounSecondForm}
    <br>вы&nbsp;набрали ${playerStats.score} ${nounScoreForm} (${playerStats.quickScores} ${adjFastForm})
    <br>совершив ${playerMistakeNumber} ${nounMistakeForm}`,
    text: outputResultMessage(stats, playerStats)
  };
};

export {getLossMessages, getWinMessages};
