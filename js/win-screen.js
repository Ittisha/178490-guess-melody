import getHtmlFromTemplate from './get-html-from-template';
import countUpScores from './results/scoring';
import {getWelcomeScreenMarkup} from './welcome-screen';
import renderScreen from './render-screen';
import {initialState} from "./data/data";
import outputResultMessage from './results/outputting-result';
import stats from './data/statistics';
import {currentState} from "./welcome-screen";

const getWinScreenMarkup = (state) => {
  const scores = countUpScores(state.playersAnswers);
  const playerStats = {
    score: scores,
    remainingNotes: currentState.lives,
    remainingTime: currentState.timeLeft
  };

  const resultMessage = outputResultMessage(stats, playerStats);

  const winScreenTemplate = getHtmlFromTemplate(`<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
    <br>вы&nbsp;набрали ${scores} баллов (8 быстрых)
    <br>совершив ${3 - state.lives} ошибки</div>
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
    renderScreen(getWelcomeScreenMarkup(initialState));
  };

  winRestartButton.addEventListener(`click`, onRestartButtonClick);

  return winScreenTemplate;
};

export default getWinScreenMarkup;
