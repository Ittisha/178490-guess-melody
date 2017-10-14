import {getUniqueArrayItem, getRandomArrayItem, getRandomInteger} from "../utils";

/** Class representing answer variant*/
class AnswerVariant {
  /**
   * Create answer variant
   * @param {Object} musicData - Contains artist, name, inage, src, genre
   */
  constructor(musicData) {
    this.artist = musicData.artist;
    this.name = musicData.name;
    this.image = musicData.image;
    this.src = musicData.src;
    this.genre = musicData.genre;
    this._isRightAnswer = false;
  }

  /**
   * Method for getting isRightAnswer
   * @return {boolean}
   */
  get isRightAnswer() {
    return this._isRightAnswer;
  }

  /**
   * Sets the appropriate isRightAnswer
   * @param {boolean} condition
   */
  set isRightAnswer(condition) {
    this._isRightAnswer = condition;
  }

}

/** Class representing a level of rhe game*/
class Level {
  /**
   * Create a level
   * @param {string} type - Level type
   * @param {string} taskMessage - Level task
   * @param {string} variantsNumber - Level answers variants quantity
   */
  constructor(type, taskMessage, variantsNumber) {
    this.type = type;
    this.taskMessage = taskMessage;
    this.variantsNumber = variantsNumber;
    this._answers = new Set();
  }

  /**
   * Method for getting answers
   * @return {Set} Answer variants
   */
  get answers() {
    return this._answers;
  }

  /**
   * Method for adding answers
   */
  addAnswers() {

  }

}

/**
 * Class representing an artist level
 * @extends Level
 */
class ArtistLevel extends Level {
  /**
   * Create an artist level
   * @param {string} type - Level type
   * @param {string} taskMessage - Level task
   * @param {number} variantsNumber - Level answers variants quantity
   */
  constructor(type = `artist`, taskMessage = `Кто исполняет эту песню?`, variantsNumber = 3) {
    super(type, taskMessage, variantsNumber);
  }

  /**
   * Add answers
   * @param {Array} audioData - Array of audio objects
   */
  addAnswers(audioData) {
    const audioTracks = audioData.slice();
    while (this._answers.size < this.variantsNumber) {
      const audioItem = getUniqueArrayItem(audioTracks);

      if (![...this._answers].find((element) => element.artist === audioItem.artist)) {
        this._answers.add(new AnswerVariant(audioItem));
      }
    }

    // Set random answer to true
    getRandomArrayItem([...this._answers]).isRightAnswer = true;
  }
}

/**
 * Class representing a genre level
 * @extends Level
 */
class GenreLevel extends Level {
  /**
   * Create a genre level
   * @param {string} type - Level type
   * @param {string} taskMessage - Level task
   * @param {number} variantsNumber - Level answers variants quantity
   */
  constructor(type = `genre`, taskMessage = `Выберите инди-рок треки`, variantsNumber = 4) {
    super(type, taskMessage, variantsNumber);
  }

  /**
   * Add answers
   * @param {Array} audioData - Array of audio objects
   */
  addAnswers(audioData) {
    const audioTracks = audioData.slice();
    while (this._answers.size < this.variantsNumber) {
      const audioItem = getUniqueArrayItem(audioTracks);

      this._answers.add(new AnswerVariant(audioItem));
    }

    // Choose genre, right answers and change task message
    const genre = getRandomArrayItem([...this._answers]).genre;
    this.taskMessage = `Выберите ${genre} трэки`;
    this._answers.forEach((element) => {
      element.isRightAnswer = (element.genre === genre);
    });
  }
}

const createGameTasks = (audioData, levelsNumber) => {
  const artistLevelNunber = getRandomInteger(1, levelsNumber - 1);

  const games = Array.from({length: artistLevelNunber}, () => {
    const artistLevel = new ArtistLevel();
    artistLevel.addAnswers(audioData);
    return artistLevel;
  });

  while (games.length < levelsNumber) {
    const genreLevel = new GenreLevel();
    genreLevel.addAnswers(audioData);
    games.push(genreLevel);
  }

  return games;
};

export {createGameTasks, ArtistLevel, GenreLevel};


