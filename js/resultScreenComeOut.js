import {welcomeScreenMarkup, mainPlayButton, onMainPlayButtonClick} from './welcomeScreen';
import renderScreen from './renderScreen';

const resultScreenComeOut = (button) => {
  const switchScreen = () => {
    renderScreen(welcomeScreenMarkup);
    button.removeEventListener(`click`, onRestartButtonClick);
    mainPlayButton.addEventListener(`click`, onMainPlayButtonClick);
  };


  const onRestartButtonClick = (evt) => {
    evt.preventDefault();
    switchScreen();
  };

  button.addEventListener(`click`, onRestartButtonClick);
};

export default resultScreenComeOut;
