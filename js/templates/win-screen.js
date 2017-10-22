import {countUpScores} from "../results/scoring";
import {currentState, showWelcome} from './welcome-screen';
import {changeView} from "../render-screen";
import statistics from '../data/statistics';
import WinView from '../views/win-view';
import {getWinMessages} from "../results/get-result-data";
import {getQuickAnswersScore} from "../results/scoring";

const createWinScreen = (result) => {
  const winScreen = new WinView(result);

  winScreen.onReplay = (evt) => {
    evt.preventDefault();
    changeView(showWelcome());
  };

  return winScreen;
};

const getPlayerResult = (state) => ({
  score: countUpScores(state.playerAnswers, state.lives),
  remainingLives: state.lives,
  remainingTime: state.timeLeft,
  quickScores: getQuickAnswersScore(state.playerAnswers)
});

const showWinScreen = () => createWinScreen(getWinMessages(statistics, getPlayerResult(currentState)));

export default showWinScreen;
