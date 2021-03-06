import {getPlayerResults} from '../game/game-utils';
import {initialState} from './initial-data';

/** @constant {number} */
const PRELOAD_WAITING_TIME = 60000;

/** @constant {number} */
const SECOND_ATTEMPT_INTERVAL = 30000;

/** @constant {number} */
const HAVE_ENOUGH_DATA_STATE = 4;

/**
 * Enum for question types
 * @readonly
 * @enum {string}
 */
const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

/**
 * Get urls for audio
 * @param {Array} data - Array of levels tasks
 * @return {Array}
 */
const getUrlsArray = (data) => {
  const urls = data.map((question) => {
    if (question.src) {
      return question.src;
    }
    return question.answers.map((it) => it.src);
  });

  return urls.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
};

/**
 * Preload audio
 * @param {Array} urls
 * @return {Promise.<*[]>}
 */
const preloadAudio = (urls) => {
  urls = urls.filter((url, index, self) => {
    return url !== `` && self.indexOf(url) === index;
  });

  return Promise.all(urls.map((url) => new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.addEventListener(`canplaythrough`, resolve, false);
    audio.src = url;

    /**
     * Repeat audio preload
     */
    const repeatAudioLoading = () => {
      setTimeout(() => {

        if (audio.readyState < HAVE_ENOUGH_DATA_STATE) {
          audio.src = url;
        }
      }, SECOND_ATTEMPT_INTERVAL);
    };

    repeatAudioLoading();

    setTimeout(() => {
      reject();
    }, PRELOAD_WAITING_TIME);
  })
  ));
};

/**
 * Prepreprocess artist answers
 * @param {Array} answers
 * @return {Array|*|{annotation}}
 */
const preprocessArtistAnswers = (answers) => {
  return answers.map((it) => ({
    artist: it.title,
    image: it.image.url,
    isRightAnswer: it.isCorrect
  }));
};

/**
 * Prepreprocess genre answers
 * @param {string} genre
 * @param {Array} answers
 * @return {Array|*|{annotation}}
 */
const preprocessGenreAnswers = (genre, answers) => {
  return answers.map((it) => ({
    src: it.src,
    genre: it.genre,
    isRightAnswer: it.genre === genre
  }));
};

/**
 * Adapt data
 * @param {Array} data
 * @return {Array|*|{annotation}}
 */
const adaptData = (data) => {
  return data.map((it) => {
    const adaptedLevelData = {};

    switch (it.type) {
      case QuestionType.ARTIST:
        adaptedLevelData.type = it.type;
        adaptedLevelData.taskMessage = it.question;
        adaptedLevelData.src = it.src;
        adaptedLevelData.answers = preprocessArtistAnswers(it.answers);
        break;

      case QuestionType.GENRE:
        adaptedLevelData.type = it.type;
        adaptedLevelData.taskMessage = it.question;
        adaptedLevelData.answers = preprocessGenreAnswers(it.genre, it.answers);
        break;
    }

    return adaptedLevelData;
  });
};

/**
 * Preprocess player result for saving
 * @param {Object} state
 * @return {Object}
 */
const preprocessResult = (state) => {
  const {remainingTime, score} = getPlayerResults(state);

  return {time: initialState.timeLeft - remainingTime,
    score};
};

export {adaptData, preloadAudio, getUrlsArray, preprocessResult};
