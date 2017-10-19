import {currentState} from "./welcome-screen";
import {games} from "../data/initial-data";
import switchScreen from '../switch-screens';
import PlayerAnswer from '../classes/player-answer-class';
import {timer} from "./welcome-screen";
import {changeView} from '../render-screen';
import showLossScreen from './loss-screen';

import ArtistLevel from '../views/artist-level-view';

const getArtistLevel = (state, gamesData) => {
  const artistLevel = new ArtistLevel(state, gamesData);
  let timerArtistLevel;

  const startTimer = () => {
    timerArtistLevel = setTimeout(() => {
      if (state.timeLeft === -1) {
        changeView(showLossScreen());
        clearTimeout(timer);
        clearTimeout(timerArtistLevel);
      } else {
        artistLevel.updateTime(state.timeLeft);
        startTimer();
      }
    }, 1000);
  };
  startTimer();

  artistLevel.onAnswer = (evt) => {
    clearTimeout(timerArtistLevel);
    evt.preventDefault();
    if (evt.target.type === `radio`) {
      const isRight = evt.target.hasAttribute(`data-isrightanswer`);

      if (!isRight) {
        state.reduceLives();
      }

      state.playerAnswers.push(new PlayerAnswer(isRight));
      switchScreen(state, gamesData);
    }
  };

  return artistLevel;
};

const showArtistLevel = () => getArtistLevel(currentState, games);


export default showArtistLevel;
