import outputResultMessage from "./outputting-result";
import {initialState} from "../data/initial-data";
import {getNounPluralForm} from '../utils';

const WORD_SCORE_PLURALS = [`балл`, `балла`, `баллов`];
const WORD_FAST_PLURALS = [`быстрый`, `быстрых`, `быстрых`];
const WORD_MISTAKE_PLURALS = [`ошибку`, `ошибки`, `ошибок`];


const getLossMessages = (stats, playerStats) => ({
  title: `Какая жалость!`,
  text: outputResultMessage(stats, playerStats)
});

const getWinMessages = (stats, playerStats) => {
  const nounScoreForm = getNounPluralForm(playerStats.score, WORD_SCORE_PLURALS);

  const adjFastForm = getNounPluralForm(playerStats.quickScore, WORD_FAST_PLURALS);

  const playerMistakeNumber = initialState.lives - playerStats.remainingLives;
  const nounMistakeForm = getNounPluralForm(playerMistakeNumber, WORD_MISTAKE_PLURALS);

  return {
    title: `Вы настоящий меломан!`,
    statistics: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
    <br>вы&nbsp;набрали ${playerStats.score} ${nounScoreForm} (${playerStats.quickScores} ${adjFastForm})
    <br>совершив ${playerMistakeNumber} ${nounMistakeForm}`,
    text: outputResultMessage(stats, playerStats)
  };
};

export {getLossMessages, getWinMessages};
