import AbstractView from './abstract-view';
import getGameHeaderTemplate from '../views/game-header';
import {findRightSong, formatTime} from '../utils';
import {addZeroInFront} from '../utils';
import getStrokeOffset from '../get-stroke-offset';

const CRITICAL_TIME = 30000;

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
    this.model = model;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    const levelTask = this.model.getQuestion();
    const answerVariants = [...levelTask.answers];
    const rightSong = findRightSong(answerVariants);

    const question = `<h2 class="title main-title">${levelTask.taskMessage}</h2>
<div class="player-wrapper">
  <div class="player">
    <audio src="${rightSong.src}" autoplay></audio>
    <button class="player-control player-control--pause"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>
</div>`;

    const answers = answerVariants.map((song, index) => `<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``} name="answer" value="val-${this.model.state.questionIndex + 1}"/>
  <label class="main-answer" for="answer-${index}">
  <img class="main-answer-preview" src="${song.image}"
alt="${song.artist}" width="134" height="134">
  ${song.artist}
  </label>
</div>`).join(``);

    return `<section class="main main--level main--level-artist">
${getGameHeaderTemplate(this.model.state)}
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
    this.timerContainer = answerContainer.querySelector(`.timer-value`);
    this.timeSeconds = answerContainer.querySelector(`.timer-value-secs`);
    this.timeMinutes = answerContainer.querySelector(`.timer-value-mins`);

    this.timerLine = answerContainer.querySelector(`.timer-line`);

    const artistForm = answerContainer.querySelector(`.main-list`);

    const audioPlayer = this.element.querySelector(`.player audio`);
    const playerButton = this.element.querySelector(`.player .player-control`);

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

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    };

    playerButton.addEventListener(`click`, onPlayerButtonCLick);
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
    this.addBlinking(time);
    const {minutes, seconds} = formatTime(time);
    const radius = this.timerLine.r.animVal.value;

    this.timeMinutes.textContent = addZeroInFront(minutes);
    this.timeSeconds.textContent = addZeroInFront(seconds);

    this.timerLine.style.strokeDashoffset = getStrokeOffset(time, radius);
  }

  /**
   * Add time blinking
   * @param {number} time - Remaining time
   */
  addBlinking(time) {
    if (time < CRITICAL_TIME && !this.timerContainer.classList.contains(`timer-value--finished`)) {
      this.timerContainer.classList.add(`timer-value--finished`);
    }
  }

}

export default ArtistLevelView;
