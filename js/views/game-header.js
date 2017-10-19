import {initialState} from "../data/initial-data";
import {formatTimeForViews} from "../utils";

const getGameHeaderTemplate = (state) => {
  const leftLives = state.lives > 0 ? state.lives : 0;
  const mistakes = new Array(initialState.lives - leftLives)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``);

  const headerTemplate = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
cx="390" cy="390" r="370"
class="timer-line"
style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer-value-mins">${formatTimeForViews(state.timeLeft).minutes}</span><!--
--><span class="timer-value-dots">:</span><!--
--><span class="timer-value-secs">${formatTimeForViews(state.timeLeft).seconds}</span>
</div>

</svg>
<div class="main-mistakes">
  ${mistakes}
</div>`.trim();

  return headerTemplate;
};

export default getGameHeaderTemplate;
