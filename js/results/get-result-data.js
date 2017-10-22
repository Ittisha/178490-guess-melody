import outputResultMessage from "./outputting-result";
import {initialState} from "../data/initial-data";
import {formatTime, getNounPluralForm} from '../utils';

const WORD_SCORE_PLURALS = [`балл`, `балла`, `баллов`];
const WORD_FAST_PLURALS = [`быстрый`, `быстрых`, `быстрых`];
const WORD_MISTAKE_PLURALS = [`ошибку`, `ошибки`, `ошибок`];
const WORD_MINUTE_PLURALS = [`минуту`, `минуты`, `минут`];
const WORD_SECOND_PLURALS = [`секунду`, `секунды`, `секунд`];


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

const getWinMessages = (stats, playerStats) => {
  const nounScoreForm = getNounPluralForm(playerStats.score, WORD_SCORE_PLURALS);

  const adjFastForm = getNounPluralForm(playerStats.quickScore, WORD_FAST_PLURALS);

  const playerMistakeNumber = initialState.lives - playerStats.remainingLives;
  const nounMistakeForm = getNounPluralForm(playerMistakeNumber, WORD_MISTAKE_PLURALS);

  const timeSpent = initialState.timeLeft - playerStats.remainingTime;
  const minutes = formatTime(timeSpent).minutes;
  const nounMinuteForm = getNounPluralForm(minutes, WORD_MINUTE_PLURALS);
  const seconds = formatTime(timeSpent).seconds;
  const nounSecondForm = getNounPluralForm(seconds, WORD_SECOND_PLURALS);

  return {
    title: `Вы настоящий меломан!`,
    statistics: `За&nbsp;${minutes}&nbsp;${nounMinuteForm} и ${seconds}&nbsp;${nounSecondForm}
    <br>вы&nbsp;набрали ${playerStats.score} ${nounScoreForm} (${playerStats.quickScores} ${adjFastForm})
    <br>совершив ${playerMistakeNumber} ${nounMistakeForm}`,
    text: outputResultMessage(stats, playerStats)
  };
};

export {getLossMessages, getWinMessages};
