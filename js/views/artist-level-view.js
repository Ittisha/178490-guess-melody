import AbstractView from './abstract-view';
import getGameHeaderTemplate from '../views/game-header';
import {findRightSong} from "../utils";

/** Class representing artist level view
 * @extends AbstractView
 */
class ArtistLevelView extends AbstractView {
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

  get template() {
    const levelTask = this.state.getQuestion(this.gamesData);
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
  <input class="main-answer-r" type="radio" id="answer-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``} name="answer" value="val-${this.state.questionIndex + 1}"/>
  <label class="main-answer" for="answer-${index}">
  <img class="main-answer-preview" src="${song.image}"
alt="${song.artist}" width="134" height="134">
  ${song.artist}
  </label>
</div>`).join(``);

    return `<section class="main main--level main--level-artist">
${getGameHeaderTemplate(this.state)}
  <div class="main-wrap">
  ${question}
    <form class="main-list">
      ${answers}
     </form>;
  </div>
</section>`;
  }

  bind() {
    const artistForm = this.element.querySelector(`.main-list`);

    const onArtistFormChange = (evt) => {
      this.onAnswer(evt);
      artistForm.removeEventListener(`change`, onArtistFormChange);
    };

    artistForm.addEventListener(`change`, onArtistFormChange);
  }

  onAnswer(evt) {
    return evt;
  }
}

export default ArtistLevelView;
