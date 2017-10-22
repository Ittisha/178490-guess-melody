import statistics from '../data/statistics';
import {currentState, showWelcome} from './welcome-screen';
import {changeView} from '../render-screen';
import LossView from '../views/loss-screen-view';
import {getLossMessages} from "../results/get-result-data";
import {countUpScores} from "../results/scoring";
import {getQuickAnswersScore} from "../results/scoring";

const createLossScreen = (result) => {
  const lossScreen = new LossView(result);

  lossScreen.onReplay = (evt) => {
    evt.preventDefault();
    changeView(showWelcome());
  };

  return lossScreen;
};

const getPlayerResult = (state) => ({
  score: countUpScores(state.playerAnswers, state.lives),
  remainingLives: state.lives,
  remainingTime: state.timeLeft,
  quickScores: getQuickAnswersScore(state.playerAnswers)
});

const showLossScreen = () => createLossScreen(getLossMessages(statistics, getPlayerResult(currentState)));
export default showLossScreen;

