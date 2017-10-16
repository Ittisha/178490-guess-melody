import {getWelcomeScreenMarkup} from './templates/welcome-screen';
import renderScreen from './render-screen';
import {initialState} from "./data/initial-data";

/**
 * Exit result screen, enter welcome screen
 * @param {Node} button
 */
const addResultScreenOutcoming = (button) => {

  // /**
  //  * Render welcome screen, add its event listeners, remove this screen event listeners
  //  */
  // const switchScreen = () => {
  //   renderScreen(getWelcomeScreenMarkup(initialState));
  //   button.removeEventListener(`click`, onRestartButtonClick);
  //   mainPlayButton.addEventListener(`click`, onMainPlayButtonClick);
  // };

  /**
   * On restart button click handler
   * @param {Object} evt
   */
  const onRestartButtonClick = (evt) => {
    evt.preventDefault();
    renderScreen(getWelcomeScreenMarkup(initialState));
  };

  button.addEventListener(`click`, onRestartButtonClick);
};

export default addResultScreenOutcoming;
