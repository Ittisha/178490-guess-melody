import getHtmlFromTemplate from './get-html-from-template';
import renderScreen from './render-screen';
import getGenreGame from './level-genre-screen';
import {currentState} from './welcome-screen';
import {games, PlayerAnswer} from "./data/data";
import {ArtistLevel} from "./data/levels-data-creation";
import getGameHeaderTemplate from './view/game-header';
import {attemptsEndedScreenMarkup} from './attempts-ended-screen';
import getWinScreenMarkup from "./win-screen";

/**
 * Render next screen, add its event listeners, remove this screen event listeners
 * @param {Node} radio
 */
const switchScreen = (radio) => {
  if (currentState.lives === -1) {
    renderScreen(attemptsEndedScreenMarkup);
  } else if (currentState.questionsLeftNumber === 0) {
    renderScreen(getWinScreenMarkup(currentState));
  } else {
    currentState.determinNextQuestion();
    if (games[currentState.questionIndex] instanceof ArtistLevel) {
      renderScreen(getArtistGame(currentState, games));

    } else {
      renderScreen(getGenreGame(currentState, games));
    }
  }

  radio.removeEventListener(`change`, onAnswerRadioChange);
};

/**
 * On answer radio click handler
 * @param {Object} evt
 */
const onAnswerRadioChange = (evt) => {
  if (evt.target.type === `radio`) {
    const isRight = evt.target.hasAttribute(`data-isrightanswer`);

    if (!isRight) {
      currentState.reduceLives();
    }

    currentState.playerAnswers.push(new PlayerAnswer(isRight));
    switchScreen(evt.target);
  }
};


const findRightSong = (songs) => {
  return songs.find((it) => it.isRightAnswer === true);
};

const getArtistGame = (state, gamesData) => {
  const levelTask = gamesData[state.questionIndex];
  const answerVariants = [...levelTask.answers];
  const rightSong = findRightSong(answerVariants);

  const question = `<h2 class="title main-title">${levelTask.taskMessage}</h2>
<div class="player-wrapper">
  <div class="player">
    <audio src="${rightSong.src}" controls></audio>
    <button class="player-control player-control--pause"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>
</div>`;

  const answers = answerVariants.map((song, index) => `<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${index}" ${song.isRightAnswer ? `data-isRightAnswer` : ``} name="answer" value="val-${state.questionIndex + 1}"/>
  <label class="main-answer" for="answer-${index}">
  <img class="main-answer-preview" src="${song.image}"
alt="${song.artist}" width="134" height="134">
  ${song.artist}
  </label>
</div>`).join(``);

  const answersForm = `<form class="main-list">
${answers}
 </form>`;

  const taskContainer = `<div class="main-wrap">
${question}
${answersForm}
</div>`;

  const container = `<section class="main main--level main--level-artist">
${getGameHeaderTemplate(state)}
${taskContainer}
</section>`;

  const containerMarkup = getHtmlFromTemplate(container);
  const artistForm = containerMarkup.querySelector(`.main-list`);

  artistForm.addEventListener(`change`, onAnswerRadioChange);
  return containerMarkup;
};

export default getArtistGame;
