import {games} from "../data/initial-data";
import {countUpScores} from "../results/scoring";
import {getQuickAnswersScore} from "../results/scoring";

const setLives = (game, lives) => {
  game = Object.assign({}, game);
  game.lives = lives;
  return game;
};

const getLevel = (num, data = games) => data[num];

const nextLevel = (state) => {
  const next = state.questionIndex + 1;

  if (!getLevel(next)) {
    throw new RangeError(`Can't find level ${next}`);
  }

  state = Object.assign({}, state);
  state.questionIndex = next;
  state.questionsLeftNumber--;

  return state;
};

const addPlayerAnswer = (game, answer) => {
  const answers = game.playerAnswers.concat(answer);

  game = Object.assign({}, game);
  game.playerAnswers = answers;

  return game;
};

const getPlayerResult = (state) => ({
  score: countUpScores(state.playerAnswers, state.lives),
  remainingLives: state.lives,
  remainingTime: state.timeLeft,
  quickScores: getQuickAnswersScore(state.playerAnswers)
});

const updateGameTime = (state, time) => {
  state = Object.assign({}, state);
  state.timeLeft = time;

  return state;
};

export {getLevel,
  nextLevel,
  setLives,
  addPlayerAnswer,
  getPlayerResult,
  updateGameTime};
