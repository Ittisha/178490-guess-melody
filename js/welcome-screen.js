import getHtmlFromTemplate from './get-html-from-template';
import renderScreen from './render-screen';
import {levelArtistScreenMarkup, artistForm, onAnswerRadioChange} from './level-artist-screen';

const welcomeScreenMarkup = getHtmlFromTemplate(`<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
</section>`
);

const mainPlayButton = welcomeScreenMarkup.querySelector(`.main-play`);

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 */
const switchScreen = () => {
  renderScreen(levelArtistScreenMarkup);
  mainPlayButton.removeEventListener(`click`, onMainPlayButtonClick);

  artistForm.addEventListener(`change`, onAnswerRadioChange);
};

/**
 * On main play button click handler
 */
const onMainPlayButtonClick = () => {
  switchScreen();
};

mainPlayButton.addEventListener(`click`, onMainPlayButtonClick);

export {welcomeScreenMarkup, mainPlayButton, onMainPlayButtonClick};