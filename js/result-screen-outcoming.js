import {welcomeScreenMarkup, mainPlayButton, onMainPlayButtonClick} from './welcome-screen';
import renderScreen from './render-screen';

/**
 * Exit result screen, enter welcome screen
 * @param {Node} button
 */
const addResultScreenOutcoming = (button) => {

  /**
   * Render welcome screen, add its event listeners, remove this screen event listeners
   */
  const switchScreen = () => {
    renderScreen(welcomeScreenMarkup);
    button.removeEventListener(`click`, onRestartButtonClick);
    mainPlayButton.addEventListener(`click`, onMainPlayButtonClick);
  };

  /**
   * On restart button click handler
   * @param {Object} evt
   */
  const onRestartButtonClick = (evt) => {
    evt.preventDefault();
    switchScreen();
  };

  button.addEventListener(`click`, onRestartButtonClick);
};

export default addResultScreenOutcoming;
