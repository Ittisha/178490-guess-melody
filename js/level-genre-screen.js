import getHtmlFromTemplate from './get-html-from-template';
import renderScreen from './render-screen';
import {attemptsEndedScreenMarkup, attemptsRestartButton} from './attempts-ended-screen';
import {winScreenMarkup, winRestartButton} from './win-screen';
import {timeOutScreenMarkup, timeOutRestartButton} from './time-out-screen';
import addResultScreenOutcoming from './result-screen-outcoming';

const levelGenreScreenMarkup = getHtmlFromTemplate(`<section class="main main--level main--level-genre">
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
    </div>
  </svg>
  <div class="main-mistakes">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
  </div>

  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
</section>`
);

const resultScreens = [
  {markup: attemptsEndedScreenMarkup,
    restartButton: attemptsRestartButton},
  {markup: winScreenMarkup,
    restartButton: winRestartButton},
  {markup: timeOutScreenMarkup,
    restartButton: timeOutRestartButton}
];

const genreAnswerButton = levelGenreScreenMarkup.querySelector(`.genre-answer-send`);
const genreForm = levelGenreScreenMarkup.querySelector(`.genre`);
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

/**
 * Returns random integer between min and max inclusive
 * @param {number} min
 * @param{number} max
 * @return {number} random number between min and max inclusive
 */
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

/**
 * Returns random array item
 * @param {Array} array
 * @return {*} random array item
 */
const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 */
const switchScreen = () => {
  const randomScreen = getRandomArrayItem(resultScreens);

  renderScreen(randomScreen.markup);
  addResultScreenOutcoming(randomScreen.restartButton);

  genreAnswerButton.removeEventListener(`click`, onGenreAnswerButtonClick);
  genreForm.removeEventListener(`change`, onCheckboxChange);
};

const resetFormChecks = () => {
  genreAnswerChecks.forEach((checkbox) => {
    checkbox.checked = false;
  });

  genreAnswerButton.disabled = true;
};

const onGenreAnswerButtonClick = (evt) => {
  evt.preventDefault();
  switchScreen();
  resetFormChecks();
};

export {levelGenreScreenMarkup, genreAnswerButton, genreForm,
  onGenreAnswerButtonClick, onCheckboxChange};
