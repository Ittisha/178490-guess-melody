import {renderScreen} from '../render-screen';
import {initialState} from '../data/initial-data';
import Game from '../classes/game-class';
import {games} from '../data/initial-data';
import {ArtistLevel} from '../classes/artist-level-class';
import getArtistGame from './level-artist-screen';
import getGenreGame from './level-genre-screen';
import WelcomeView from '../views/welcome-view';


let currentState;

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 */
const switchScreen = () => {
  if (games[currentState.questionIndex] instanceof ArtistLevel) {
    renderScreen(getArtistGame(currentState, games));
  } else {
    renderScreen(getGenreGame(currentState, games));
  }
};


const showWelcome = () => {
  currentState = new Game(initialState);
  currentState.resetPlayerAnswers();

  const welcome = new WelcomeView();
  welcome.onStart = () => {
    switchScreen();
  };

  return welcome;
};


export {showWelcome, currentState};
