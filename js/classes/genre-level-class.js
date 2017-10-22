import Level from "./level-class";
import {getRandomArrayItem, getUniqueArrayItem} from "../utils";
import AnswerVariant from "./answer-variant-class";

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

export {GenreLevel};
