import Level from "./level-class";
import {getRandomArrayItem, getUniqueArrayItem} from "../utils";
import AnswerVariant from "./answer-variant-class";

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

export {ArtistLevel};
