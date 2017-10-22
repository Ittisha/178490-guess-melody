import {currentState} from './welcome-screen';
import {games} from '../data/initial-data';
import {isRightGenreChecked} from '../utils';
import switchScreen from '../switch-screens';
import PlayerAnswer from '../classes/player-answer-class';
import GenreLevel from '../views/genre-level-view';
import {changeView} from '../render-screen';
import showLossScreen from './loss-screen';
import {timer} from "./welcome-screen";

const getGenreLevel = (state, gamesData) => {
  const genreLevel = new GenreLevel(state, gamesData);
  let timerGenreLevel;

  const startTimer = () => {
    timerGenreLevel = setTimeout(() => {
      if (state.timeLeft === -1) {
        changeView(showLossScreen());
        clearTimeout(timer);
        clearTimeout(timerGenreLevel);
      } else {
        genreLevel.updateTime(state.timeLeft);
        startTimer();
      }
    }, 1000);
  };
  startTimer();

  genreLevel.onAnswer = (evt) => {
    clearTimeout(timerGenreLevel);
    evt.preventDefault();
    const checkedChecks = Array.from(evt.target.parentNode.querySelectorAll(`input[type="checkbox"]:checked`));
    const isRight = isRightGenreChecked(checkedChecks);

    if (!isRight) {
      state.reduceLives();
    }
    state.playerAnswers.push(new PlayerAnswer(isRight));

    switchScreen(state, gamesData);
  };

  return genreLevel;
};

const showGenreLevel = () => getGenreLevel(currentState, games);

export default showGenreLevel;
