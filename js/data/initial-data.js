import audios from './audio';
import {createGameTasks} from './levels-data-creation';

const initialState = Object.freeze({
  questionsLeftNumber: 10,
  questionIndex: 0,
  timeLeft: 300000,
  lives: 3,
  playerAnswers: [],
});

const games = createGameTasks(audios, initialState.questionsLeftNumber);

export {initialState, games};
