import {ArtistLevel} from './data/levels-data-creation';
import renderScreen from './render-screen';
import getArtistGame from './level-artist-screen';
import {attemptsEndedScreenMarkup} from './attempts-ended-screen';
import getWinScreenMarkup from "./win-screen";
import getGenreGame from './level-genre-screen';

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 * @param {Object} state - Current state of the game
 * @param {Array} levels - Levels to go throw
 * @param {Node} button - Node to remove event listener
 *@param {Function} cb - callback to remove
 */
const switchScreen = (state, levels, button, cb) => {
  if (state.lives < 0) {
    renderScreen(attemptsEndedScreenMarkup);
  } else if (state.questionsLeftNumber === 1) {
    renderScreen(getWinScreenMarkup(state));
  } else {
    state.determinNextQuestion();
    if (levels[state.questionIndex] instanceof ArtistLevel) {
      renderScreen(getArtistGame(state, levels));
    } else {
      renderScreen(getGenreGame(state, levels));
    }
  }

  button.removeEventListener(`click`, cb);
};

export default switchScreen;
