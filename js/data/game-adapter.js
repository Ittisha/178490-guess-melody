import {getPlayerResults} from '../game/game-utils';
import {initialState} from './initial-data';

const WAITING_TIME = 60000;

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

  return Promise.all(urls.map((url) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener(`suspend`, resolve, false);
      audio.preload = `auto`;
      audio.src = url;

      setTimeout(() => {
        reject();
      }, WAITING_TIME);
    });
  }));

/*  const fetchAndCache = (url, cache) => {
    return cache.match(url)
        .then((cacheResponse) => {

          if (cacheResponse) {
            return cacheResponse;
          }

          return fetch(url)
              .then((networkResponse) => {

                cache.put(url, networkResponse.clone());
                return networkResponse;
              });
        });
  };

  return new Promise((resolve) => window.caches.open(`audio-pre-cache`)
      .then((cache) => Promise.all(urls.map((url) => fetchAndCache(url, cache)))).
    then(() => resolve()));*/


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

const preprocessResult = (state) => {
  const {remainingTime, score} = getPlayerResults(state);

  return {time: initialState.timeLeft - remainingTime,
    score};
};

export {adaptData, preloadAudio, getUrlsArray, preprocessResult};
