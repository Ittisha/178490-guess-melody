import AbstractView from './abstract-view';
import {initialState} from '../data/initial-data';

/** @constant {number} */
const MILLISECONDS_IN_MINUTE = 60000;

/** Class representing welcome view
 * @extends AbstractView
 */
class WelcomeView extends AbstractView {

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    return `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${initialState.timeLeft / MILLISECONDS_IN_MINUTE} минут ответить на все вопросы.<br>
    Ошибиться можно ${initialState.lives} раза.<br>
    Удачи!
  </p>
</section>`.trim();
  }

  /**
   * Bind callback to button click
   */
  bind() {
    const container = this.element;
    this._playButton = container.querySelector(`.main-play`);

    const onPlayButtonClick = () => {
      this.onStart();
      this._playButton.removeEventListener(`click`, onPlayButtonClick);
    };

    this._playButton.addEventListener(`click`, onPlayButtonClick);
  }

  /**
   * Do on start button click
   */
  onStart() {}

  /**
   * Show start button
   */
  showButton() {
    this._playButton.style.display = `block`;
  }

}

export default WelcomeView;
