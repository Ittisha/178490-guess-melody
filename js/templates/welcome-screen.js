import {initialState} from '../data/initial-data';
import Game from '../classes/game-class';
import {games} from '../data/initial-data';
import {ArtistLevel} from '../classes/artist-level-class';
import showGenreLevel from './level-genre-screen';
import WelcomeView from '../views/welcome-view';
import showArtistLevel from './level-artist-screen';
import {changeView} from '../render-screen';
import Timer from '../classes/timer-class';

let currentState;
let timer;
let gameTimer;
/**
 * Render next screen, add its event listeners, remove this screen event listeners
 */
const switchScreen = () => {
  if (games[currentState.questionIndex] instanceof ArtistLevel) {
    changeView(showArtistLevel());
  } else {
    changeView(showGenreLevel());
  }
};


const showWelcome = () => {
  currentState = new Game(initialState);
  currentState.resetPlayerAnswers();
  gameTimer = new Timer(currentState.timeLeft);

  const welcome = new WelcomeView();
  welcome.onStart = () => {
    switchScreen();
    const startTimer = () => {
      timer = setTimeout(() => {
        currentState.timeLeft = gameTimer.tick();
        startTimer();
      }, 1000);
    };
    startTimer();
  };

  return welcome;
};


export {showWelcome, currentState, timer};
