import getHtmlFromTemplate from './get-html-from-template';

const timeOutScreenMarkup = getHtmlFromTemplate(`<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`
);

const timeOutRestartButton = timeOutScreenMarkup.querySelector(`.main-replay`);

export {timeOutScreenMarkup, timeOutRestartButton};
