import getHtmlFromTemplate from './get-html-from-template';
import renderScreen from './render-screen';
import {initialState} from "./data/data";
import {copyObject} from "./utils";
import {games} from "./data/data";
import {ArtistLevel} from "./data/levels-data-creation";
import getArtistGame from "./level-artist-screen";
import {levelGenreScreenMarkup, genreForm, onCheckboxChange} from "./level-genre-screen";

const currentState = copyObject(initialState);

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 * @param {Node} button
 */
const switchScreen = (button) => {
  if (games[currentState.questionIndex] instanceof ArtistLevel) {
    renderScreen(getArtistGame(currentState, games));
  } else {
    renderScreen(levelGenreScreenMarkup);
    genreForm.addEventListener(`change`, onCheckboxChange);
  }
  button.removeEventListener(`click`, onMainPlayButtonClick);
};

/**
 * On main play button click handler
 * @param {Object} evt
 */
const onMainPlayButtonClick = (evt) => {
  if (evt.target.tagName.toLowerCase() === `button`) {
    switchScreen(evt.target);
  }
};

const getWelcomeScreenMarkup = (state) => {
  const welcomeScreen = getHtmlFromTemplate(`<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${state.timeLeft / 60000} минут ответить на все вопросы.<br>
    Ошибиться можно ${state.livesLeft} раза.<br>
    Удачи!
  </p>
</section>`);

  const mainPlayButton = welcomeScreen.querySelector(`.main-play`);

  mainPlayButton.addEventListener(`click`, onMainPlayButtonClick);

  return welcomeScreen;
};


export {getWelcomeScreenMarkup, currentState};
