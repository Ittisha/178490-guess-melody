import {ArtistLevel} from './classes/artist-level-class';
import {changeView} from './render-screen';
import showArtistLevel from './templates/level-artist-screen';
import showLossScreen from './templates/attempts-ended-screen';
import showWinScreen from "./templates/win-screen";
import showGenreLevel from './templates/level-genre-screen';

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 * @param {Object} state - Current state of the game
 * @param {Array} levels - Levels to go throw
 */
const switchScreen = (state, levels) => {
  if (state.lives < 0) {
    changeView(showLossScreen());
  } else if (state.questionsLeftNumber === 1) {
    changeView(showWinScreen());
  } else {
    state.determineNextQuestion();
    if (levels[state.questionIndex] instanceof ArtistLevel) {
      changeView(showArtistLevel());
    } else {
      changeView(showGenreLevel());
    }
  }

};

export default switchScreen;
