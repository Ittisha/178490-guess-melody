import AbstractView from './abstract-view';
import {initialState} from '../data/initial-data';

/** Class representing welcome view
 * @extends AbstractView
 */
class WelcomeView extends AbstractView {

  /**
   * Method for getting string template
   * @return {string} - String template for html-markup
   */
  get template() {
    const preloader = `<div class="main-preloader"></div>`;

    return `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  ${preloader}
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${initialState.timeLeft / 60000} минут ответить на все вопросы.<br>
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
    this.preloader = container.querySelector(`.main-preloader`);
    this.playButton = container.querySelector(`.main-play`);

    const onPlayButtonClick = () => {
      this.onStart();
      this.playButton.removeEventListener(`click`, onPlayButtonClick);
    };

    this.playButton.addEventListener(`click`, onPlayButtonClick);
  }

  onStart() {}

  stopPreloader() {
    this.preloader.style.display = `none`;
    this.playButton.style.display = `block`;
  }

  showWarning() {
    const errorContainer = document.createElement(`div`);
    errorContainer.classList.add(`error-message`);
    errorContainer.textContent = `Сожалеем, у нас не получилось заранее
    загрузить все необходимые данные. Но вы можете начать игру на
    свой страх и риск.`;

    const containerClose = document.createElement(`a`);
    containerClose.href = `#`;
    containerClose.classList.add(`error-message-close`);

    errorContainer.appendChild(containerClose);
    document.body.appendChild(errorContainer);

    const closeErrorContainer = (evt) => {
      evt.preventDefault();
      document.body.removeChild(errorContainer);

      containerClose.removeEventListener(`click`, onContainerCloseButtonClick);

    };

    const onContainerCloseButtonClick = function (evt) {
      closeErrorContainer(evt);
    };

    containerClose.addEventListener(`click`, onContainerCloseButtonClick);
  }
}

export default WelcomeView;
