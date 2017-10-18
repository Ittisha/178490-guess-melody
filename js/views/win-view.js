import AbstractView from './abstract-view';

/** Class representing win screen view
 * @extends AbstractView
 */
class WinView extends AbstractView {
  /**
   * Create artist level view
   * @param {Object} result
   */
  constructor(result) {
    super();
    this.result = result;
  }

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */

  get template() {

    return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${this.result.title}</h2>
  <div class="main-stat">${this.result.statistics}</div>
  <span class="main-comparison">${this.result.text}</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`.trim();
  }

  bind() {
    const restartButton = this.element.querySelector(`.main-replay`);
    /**
     * On restart button click handler
     * @param {Object} evt
     */
    const onRestartButtonClick = (evt) => {
      this.onReplay(evt);
      restartButton.removeEventListener(`click`, onRestartButtonClick);
    };

    restartButton.addEventListener(`click`, onRestartButtonClick);
  }

  onReplay(evt) {
    return evt;
  }
}

export default WinView;
