import AbstractView from './abstract-view';

/** Class representing win screen view
 * @extends AbstractView
 */
class LossView extends AbstractView {
  /**
   * Create artist level view
   * @param {Object} result
   */
  constructor(result) {
    super();
    this._result = result;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */

  get template() {

    return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${this._result.title}</h2>
  <div class="main-stat">${this._result.text}</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`.trim();
  }

  /**
   * Bind callback on restart button click
   */
  bind() {
    const restartButton = this.element.querySelector(`.main-replay`);
    /**
     * On restart button click handler
     * @param {Object} evt
     */
    const onRestartButtonClick = (evt) => {
      evt.preventDefault();
      this.onReplay();
      restartButton.removeEventListener(`click`, onRestartButtonClick);
    };

    restartButton.addEventListener(`click`, onRestartButtonClick);
  }

  /**
   * Do on replay button click
   */
  onReplay() {

  }
}

export default LossView;
