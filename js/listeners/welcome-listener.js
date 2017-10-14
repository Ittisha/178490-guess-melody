import renderScreen from './render-screen';
import {levelArtistScreenMarkup, artistForm, onAnswerRadioChange} from './level-artist-screen';

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 * @param {Node} button
 */
const switchScreen = (button) => {
  renderScreen(levelArtistScreenMarkup);
  button.removeEventListener(`click`, onMainPlayButtonClick);

  artistForm.addEventListener(`change`, onAnswerRadioChange);
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

export default onMainPlayButtonClick;
