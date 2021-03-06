import AbstractView from './abstract-view';
import {CRITICAL_TIME} from '../data/initial-data';
import getGameHeaderTemplate from '../views/game-header';
import {findRightSong, formatTime, switchPlayPause} from '../utils/utils';
import {addZeroInFront} from '../utils/utils';
import getStrokeOffset from '../utils/get-stroke-offset';

/** Class representing artist level view
 * @extends AbstractView
 */
class ArtistLevelView extends AbstractView {
  /**
   * Create artist level view
   * @param {Object} model - The model of the game
   */
  constructor(model) {
    super();
    this._model = model;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    const levelTask = this._model.getQuestion();
    const answerVariants = [...levelTask.answers];
    const rightSong = levelTask.src ? levelTask.src : findRightSong(answerVariants).src;

    const question = `<h2 class="title main-title">${levelTask.taskMessage}</h2>
<div class="player-wrapper">
  <div class="player">
    <audio src="${rightSong}" autoplay></audio>
    <button class="player-control player-control--pause"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>
</div>`;

    const answers = answerVariants.map((song, index) => `<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``} name="answer" value="val-${this._model.state.questionIndex + 1}"/>
  <label class="main-answer" for="answer-${index}">
  <img class="main-answer-preview" src="${song.image}"
alt="${song.artist}" width="134" height="134">
  ${song.artist}
  </label>
</div>`).join(``);

    return `<section class="main main--level main--level-artist">
${getGameHeaderTemplate(this._model.state)}
  <div class="main-wrap">
  ${question}
    <form class="main-list">
      ${answers}
     </form>;
  </div>
</section>`;
  }

  /**
   * Bind callback to form change
   */
  bind() {
    const answerContainer = this.element;
    this._timerContainer = answerContainer.querySelector(`.timer-value`);
    this._timeSeconds = this._timerContainer.querySelector(`.timer-value-secs`);
    this._timeMinutes = this._timerContainer.querySelector(`.timer-value-mins`);

    this._timerLine = answerContainer.querySelector(`.timer-line`);

    const artistForm = answerContainer.querySelector(`.main-list`);

    const audioPlayer = answerContainer.querySelector(`.player audio`);
    const playerButton = answerContainer.querySelector(`.player .player-control`);

    const onArtistFormChange = (evt) => {
      if (evt.target.type === `radio`) {
        evt.preventDefault();

        const isRight = evt.target.hasAttribute(`data-isrightanswer`);

        if (isRight) {
          this.onSuccess();
        } else {
          this.onMistake();
        }

        artistForm.removeEventListener(`change`, onArtistFormChange);
        playerButton.removeEventListener(`click`, onPlayerButtonCLick);
      }
    };

    artistForm.addEventListener(`change`, onArtistFormChange);

    const onPlayerButtonCLick = (evt) => {
      evt.preventDefault();
      const button = evt.target;

      button.classList.toggle(`player-control--pause`);
      button.classList.toggle(`player-control--play`);

      switchPlayPause(audioPlayer);
    };

    playerButton.addEventListener(`click`, onPlayerButtonCLick);
  }

  /**
   * Update timer values and line
   * @param {number} time - New time
   */
  updateTime(time) {
    this._addBlinking(time);
    const {minutes, seconds} = formatTime(time);
    const radius = this._timerLine.r.animVal.value;

    this._timeMinutes.textContent = addZeroInFront(minutes);
    this._timeSeconds.textContent = addZeroInFront(seconds);

    this._timerLine.style.strokeDashoffset = getStrokeOffset(time, radius);
  }

  /**
   * Add time blinking
   * @param {number} time - Remaining time
   */
  _addBlinking(time) {
    if (time < CRITICAL_TIME && !this._timerContainer.classList.contains(`timer-value--finished`)) {
      this._timerContainer.classList.add(`timer-value--finished`);
    }
  }

  /**
   * Do on right answer
   */
  onSuccess() {

  }

  /**
   * Do on wrong answer
   */
  onMistake() {

  }

}

export default ArtistLevelView;
