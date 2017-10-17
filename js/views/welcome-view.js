import AbstractView from './abstract-view';
import {initialState} from "../data/initial-data";

class WelcomeView extends AbstractView {

  get template() {
    return `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${initialState.timeLeft / 60000} минут ответить на все вопросы.<br>
    Ошибиться можно ${initialState.lives} раза.<br>
    Удачи!
  </p>
</section>`.trim();
  }

  bind() {
    const playButton = this.element.querySelector(`.main-play`);
    const onPlayButtonClick = () => {
      this.onStart();
      playButton.removeEventListener(`click`, onPlayButtonClick);
    };
    playButton.addEventListener(`click`, onPlayButtonClick);
  }

  onStart() {}
}

export default WelcomeView;
