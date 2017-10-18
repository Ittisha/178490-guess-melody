import getHtmlFromTemplate from '../get-html-from-template';
import {currentState} from './welcome-screen';
import {games} from '../data/initial-data';
import getGameHeaderTemplate from '../views/game-header';
import {isRightGenreChecked} from '../utils';
import switchScreen from '../switch-screens';
import PlayerAnswer from '../classes/player-answer-class';

/**
 * On answer button click handler
 * @param {Object} evt
 */
const onGenreAnswerButtonClick = (evt) => {
  evt.preventDefault();
  if (evt.target.tagName.toLowerCase() === `button`) {
    const checkedChecks = Array.from(evt.target.parentNode.querySelectorAll(`input[type="checkbox"]:checked`));
    const isRight = isRightGenreChecked(checkedChecks);

    if (!isRight) {
      currentState.reduceLives();
    }
    currentState.playerAnswers.push(new PlayerAnswer(isRight));

    switchScreen(currentState, games);
  }
};

const getGenreGame = (state, gamesData) => {
  const levelTask = gamesData[state.questionIndex];
  const answerVariantsData = [...levelTask.answers];

  const answers = answerVariantsData.map((song, index) => `<div class="genre-answer">
  <div class="player-wrapper">
    <div class="player">
      <audio src="${song.src}"></audio>
      <button class="player-control player-control--pause"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
  <input type="checkbox" name="answer" value="answer-${state.questionIndex + 1}" id="a-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``}>
  <label class="genre-answer-check" for="a-${index}"></label>
 </div>`).join(``);

  const task = `<div class="main-wrap">
   <h2 class="title">${levelTask.taskMessage}</h2>
    <form class="genre">
      ${answers}

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
 </div>`;

  const container = `<section class="main main--level main--level-genre">
${getGameHeaderTemplate(state)}
${task}
</section>`;

  const containerMarkup = getHtmlFromTemplate(container);

  const genreAnswerButton = containerMarkup.querySelector(`.genre-answer-send`);

  const genreForm = containerMarkup.querySelector(`.genre`);
  const genreAnswerChecks = Array.from(genreForm.querySelectorAll(`input[name="answer"]`));

  genreAnswerButton.disabled = true;

  /**
   * On checkbox click handler
   * @param {Object} evt
   */
  const onCheckboxChange = (evt) => {
    if (evt.target.type === `checkbox`) {
      genreAnswerButton.disabled = !genreAnswerChecks.some((checkbox) => checkbox.checked);
    }

  };

  genreForm.addEventListener(`change`, onCheckboxChange);
  genreAnswerButton.addEventListener(`click`, onGenreAnswerButtonClick);

  return containerMarkup;

};

export default getGenreGame;
