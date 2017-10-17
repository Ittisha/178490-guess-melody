import getHtmlFromTemplate from '../get-html-from-template';
import {countUpScores, getQuickAnswersScore} from "../results/scoring";
import {showWelcome} from './welcome-screen';
import {renderScreen, changeView} from "../render-screen";
import {initialState} from "../data/initial-data";
import outputResultMessage from '../results/outputting-result';
import stats from '../data/statistics';
import {getNounPluralForm} from '../utils';

const WORD_SCORE_PLURALS = [`балл`, `балла`, `баллов`];
const WORD_FAST_PLURALS = [`быстрый`, `быстрых`, `быстрых`];
const WORD_MISTAKE_PLURALS = [`ошибку`, `ошибки`, `ошибок`];

const getWinScreenMarkup = (state) => {
  const playerAnswers = state.playerAnswers;

  const scores = countUpScores(playerAnswers, state.lives);
  const nounScoreForm = getNounPluralForm(scores, WORD_SCORE_PLURALS);

  const quickScores = getQuickAnswersScore(playerAnswers);
  const adjFastForm = getNounPluralForm(quickScores, WORD_FAST_PLURALS);

  const playerStats = {
    score: scores,
    remainingNotes: state.lives,
    remainingTime: state.timeLeft
  };

  const playerMistakeNumber = initialState.lives - state.lives;
  const nounMistakeForm = getNounPluralForm(playerMistakeNumber, WORD_MISTAKE_PLURALS);

  const resultMessage = outputResultMessage(stats, playerStats);

  const winScreenTemplate = getHtmlFromTemplate(`<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
    <br>вы&nbsp;набрали ${scores} ${nounScoreForm} (${quickScores} ${adjFastForm})
    <br>совершив ${playerMistakeNumber} ${nounMistakeForm}</div>
  <span class="main-comparison">${resultMessage}</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`);

  const winRestartButton = winScreenTemplate.querySelector(`.main-replay`);

  /**
   * On restart button click handler
   * @param {Object} evt
   */
  const onRestartButtonClick = (evt) => {
    evt.preventDefault();
    changeView(showWelcome());
    winRestartButton.removeEventListener(`click`, onRestartButtonClick);
  };

  winRestartButton.addEventListener(`click`, onRestartButtonClick);

  return winScreenTemplate;
};


export default getWinScreenMarkup;
