import AbstractView from './abstract-view';
import getGameHeaderTemplate from '../views/game-header';
import {addZeroInFront, formatTime} from '../utils';
import getStrokeOffset from '../get-stroke-offset';
import {isRightGenreChecked} from '../utils';

/** Class representing artist level view
 * @extends AbstractView
 */
class GenreLevelView extends AbstractView {
  /**
   * Create artist level view
   * @param {Object} model - The model of the game
   */
  constructor(model) {
    super();
    this.model = model;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    const levelTask = this.model.getQuestion();
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
  <input type="checkbox" name="answer" value="answer-${this.model.state.questionIndex + 1}" id="a-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``}>
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
${getGameHeaderTemplate(this.model.state)}
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

    this.timerLine = answerContainer.querySelector(`.timer-line`);

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
      evt.preventDefault();

      const checkedChecks = Array.from(evt.target.parentNode.querySelectorAll(`input[type="checkbox"]:checked`));
      const isRight = isRightGenreChecked(checkedChecks);

      if (isRight) {
        this.onSuccess();
      } else {
        this.onMistake();
      }

      genreAnswerButton.removeEventListener(`click`, onGenreAnswerButtonClick);
      genreForm.removeEventListener(`change`, onCheckboxChange);
      genreForm.removeEventListener(`click`, onGenreFormClick);
    };

    genreForm.addEventListener(`change`, onCheckboxChange);
    genreForm.addEventListener(`click`, onGenreFormClick);
    genreAnswerButton.addEventListener(`click`, onGenreAnswerButtonClick);

  }

  onSuccess() {

  }

  onMistake() {

  }

  /**
   * Update timer values and line
   * @param {number} time - New time
   */
  updateTime(time) {
    const {minutes, seconds} = formatTime(time);
    const radius = this.timerLine.r.animVal.value;

    this.timeMinutes.textContent = addZeroInFront(minutes);
    this.timeSeconds.textContent = addZeroInFront(seconds);

    this.timerLine.style.strokeDashoffset = getStrokeOffset(time, radius);
  }
}

export default GenreLevelView;
