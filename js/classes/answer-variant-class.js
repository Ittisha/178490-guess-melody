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

export default AnswerVariant;
