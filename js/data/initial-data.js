const CRITICAL_TIME = 30000;

const initialState = Object.freeze({
  questionsLeftNumber: 10,
  questionIndex: 0,
  timeLeft: 300000,
  lives: 3,
  playerAnswers: [],
});

export {initialState, CRITICAL_TIME};
