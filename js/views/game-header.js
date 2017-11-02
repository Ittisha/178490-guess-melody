import {initialState} from '../data/initial-data';
import {addZeroInFront, formatTime} from '../utils/utils';
import getStrokeOffset from '../utils/get-stroke-offset';

/** @constant {number} */
const TIMER_RADIUS = 370;

/**
 * Get game header template
 * @param {Object} state
 * @return {string}
 */
const getGameHeaderTemplate = (state) => {
  const leftLives = state.lives > 0 ? state.lives : 0;
  const {minutes, seconds} = formatTime(state.timeLeft);
  const dashArray = 2 * Math.PI * TIMER_RADIUS;
  const offset = getStrokeOffset(state.timeLeft, TIMER_RADIUS);
  const blinkingClass = state.timeLeft < 30000 ? `timer-value--finished` : ``;

  const mistakes = new Array(initialState.lives - leftLives)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``);

  const headerTemplate = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
cx="390" cy="390" r="${TIMER_RADIUS}"
class="timer-line"
style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center; stroke-dasharray: ${dashArray}; stroke-dashoffset: ${offset}"></circle>

<div class="timer-value ${blinkingClass}" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer-value-mins">${addZeroInFront(minutes)}</span><!--
--><span class="timer-value-dots">:</span><!--
--><span class="timer-value-secs">${addZeroInFront(seconds)}</span>
</div>

</svg>
<div class="main-mistakes">
  ${mistakes}
</div>`.trim();

  return headerTemplate;
};

export default getGameHeaderTemplate;
