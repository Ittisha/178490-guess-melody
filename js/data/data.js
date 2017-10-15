import audios from './audio';
import {createGameTasks} from './levels-data-creation';

const initialState = Object.freeze({
  questionsLeftNumber: 10,
  questionIndex: 0,
  timeLeft: 300000,
  lives: 3,
  playerAnswers: [],

  reduceLives() {
    if (this.lives >= 0) {
      --this.lives;
    }
  },

  determinNextQuestion() {
    if (this.questionsLeftNumber > 0) {
      --this.questionsLeftNumber;
      ++this.questionIndex;
    }
  },

  resetPlayerAnswers() {
    this.playerAnswers = [];
  }
});

const games = createGameTasks(audios, initialState.questionsLeftNumber);

class PlayerAnswer {
  constructor(boolean, time = 30000) {
    this.isRightAnswer = boolean;
    this.time = time;
  }
}

export {initialState, games, PlayerAnswer};
