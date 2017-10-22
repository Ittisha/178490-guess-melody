import AbstractView from './abstract-view';
import getGameHeaderTemplate from '../views/game-header';
import {addZeroInFront, formatTime} from "../utils";

/** Class representing artist level view
 * @extends AbstractView
 */
class GenreLevelView extends AbstractView {
  /**
   * Create artist level view
   * @param {Object} state - The state of the game
   * @param {Array} gamesData
   */
  constructor(state, gamesData) {
    super();
    this.state = state;
    this.gamesData = gamesData;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    const levelTask = this.gamesData[this.state.questionIndex];
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
  <input type="checkbox" name="answer" value="answer-${this.questionIndex + 1}" id="a-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``}>
  <label class="genre-answer-check" for="a-${index}"></label>
 </div>`).join(``);

    const task = `<div class="main-wrap">
   <h2 class="title">${levelTask.taskMessage}</h2>
    <form class="genre">
      ${answers}

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
 </div>`;

    return `<section class="main main--level main--level-genre">
${getGameHeaderTemplate(this.state)}
${task}
</section>`;
  }

  /**
   * Bind callback to form change
   */
  bind() {
    const answerContainer = this.element;
    this.timeSeconds = answerContainer.querySelector(`.timer-value-secs`);
    this.timeMinutes = answerContainer.querySelector(`.timer-value-mins`);
    const genreAnswerButton = answerContainer.querySelector(`.genre-answer-send`);
    genreAnswerButton.disabled = true;

    const genreForm = answerContainer.querySelector(`.genre`);
    const genreAnswerChecks = Array.from(genreForm.querySelectorAll(`input[name="answer"]`));

    const onGenreFormClick = (evt) => {

      const button = evt.target;
      if (button.classList.contains(`player-control`)) {
        evt.preventDefault();

        const playerContainer = button.parentNode;
        const audioPlayer = playerContainer.querySelector(`audio`);

        button.classList.toggle(`player-control--pause`);
        button.classList.toggle(`player-control--play`);
        if (audioPlayer.paused) {
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
      }
    };

    /**
     * On checkbox click handler
     * @param {Object} evt
     */
    const onCheckboxChange = (evt) => {
      if (evt.target.type === `checkbox`) {
        genreAnswerButton.disabled = !genreAnswerChecks.some((checkbox) => checkbox.checked);
      }

    };

    const onGenreAnswerButtonClick = (evt) => {
      this.onAnswer(evt);
      genreAnswerButton.removeEventListener(`click`, onGenreAnswerButtonClick);
      genreForm.removeEventListener(`change`, onCheckboxChange);
      genreForm.removeEventListener(`click`, onGenreFormClick);
    };

    genreForm.addEventListener(`change`, onCheckboxChange);
    genreForm.addEventListener(`click`, onGenreFormClick);
    genreAnswerButton.addEventListener(`click`, onGenreAnswerButtonClick);

  }

  onAnswer(evt) {
    return evt;
  }

  updateTime(time) {
    const {minutes, seconds} = formatTime(time);

    this.timeMinutes.textContent = addZeroInFront(minutes);
    this.timeSeconds.textContent = addZeroInFront(seconds);
  }
}

export default GenreLevelView;
