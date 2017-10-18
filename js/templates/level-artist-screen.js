import {currentState} from "./welcome-screen";
import {games} from "../data/initial-data";
import switchScreen from '../switch-screens';
import PlayerAnswer from '../classes/player-answer-class';

import ArtistLevel from '../views/artist-level-view';


const getArtistLevel = (state, gamesData) => {
  const artistLevel = new ArtistLevel(state, gamesData);

  artistLevel.onAnswer = (evt) => {
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
