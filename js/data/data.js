import audios from './audio';
import {createGameTasks} from './levels-data-creation';

const initialState = Object.freeze({
  questionsLeftNumber: 10,
  questionIndex: 0,
  timeLeft: 300000,
  lives: 3,
  playersAnswers: [], // каждый ответ {boolen: true/false, time: 20000}

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
  }
});

const games = createGameTasks(audios, initialState.questionsLeftNumber);

const playerAnswer = {
  isRightAnswer: true,
  time: 30000
};

export {initialState, games, playerAnswer};
